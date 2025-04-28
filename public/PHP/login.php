<?php
    $raw_req = file_get_contents("php://input");
    $req_data = json_decode($raw_req);

    if (filter_var($req_data->email, FILTER_VALIDATE_EMAIL)) {
        $validEmail = true;
    }else{
        $validEmail = false;
        $emailError = "email is invalid \r\n";
    }
    if(preg_match("/^[1-9a-z]*$/", $req_data->password)) {
        $validPassword = true;
    }
    else{
        $validPassword = false;
        $passwordError = "password is invalid \r\n";
    }
    if(preg_match("/^[a-zA-z1-9]*$/", $req_data->captchaAns)){
        $validCaptcha = true;
    }else{
        $validCaptcha = false;
        $captchaError = "invalid CAPTCHA \r\n";
    }

    if($validPassword && $validEmail && $validCaptcha) {
        $db = new mysqli("localhost","root","","GrocceryGuyDatabase");
           
        $q = "SELECT PasswordHash, UserID, IsStaff FROM Users WHERE Email = '" . $req_data->email ."'";
        $userData = mysqli_query( $db, $q );
        $userData = mysqli_fetch_all( $userData );
        //var_dump($userData);
        $passwordHash = $userData[0][0];
        $userID = $userData[0][1];
        $isStaff = $userData[0][2];
    
        $q = "SELECT Answer FROM CAPTCHA WHERE CAPTCHAID = ".$req_data->captchaID.";";
        $captchaAns = mysqli_query( $db, $q );
        $captchaAns = mysqli_fetch_all( $captchaAns )[0][0];
    
        if($captchaAns === $req_data->captchaAns){
            if(password_verify($req_data->password, $passwordHash)){
                $response = array(
                    "success" => true,
                    "userID"=> $userID
                );
                session_start();
                session_regenerate_id();
                $_SESSION['ID'] = session_id();
                $_SESSION['userID'] = $userID;
                $_SESSION['password'] = $req_data->password;
                $_SESSION['isStaff'] = $isStaff;
                //setcookie('loggedIn', true, time() + 0,'/');
            }else{
                $response = array(
                    'success'=> false,
                    'error'=> "invalid login info"
                );
            }
        }else{
            $response = array(
                "success"=> false,
                "error"=> "incorrect CAPTCHA submitted"
            );
        }
    }else{
        $errorMsg = "";
        if(!$validCaptcha){
            $errorMsg .= $captchaError;
        }
        if(!$validEmail){
            $errorMsg .= $emailError;
        }
        if(!$validPassword){
            $errorMsg .= $passwordError;
        }
        $response = array(
            "success"=> false,
            "error"=> $errorMsg
        );
    }
    
    $responseData = json_encode($response);
    mysqli_close($db);
    echo $responseData;
?>