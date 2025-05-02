<?php
    $raw_req = file_get_contents("php://input");
    $req_data = json_decode($raw_req);
    $db = new mysqli("localhost","root","","GrocceryGuyDatabase");


    
    //Validation / sanitization of inputs
    if (filter_var($req_data->email, FILTER_VALIDATE_EMAIL)) {//check email is of correct format
        $validEmail = true;
    }else{
        $validEmail = false;
        $emailError = "email is invalid \r\n";
    }
    if(preg_match("/^[0-9a-z]*$/", $req_data->password)) {//password should be hashed server side therfore only letters and numbers allowed
        $validPassword = true;
    }
    else{
        $validPassword = false;
        $passwordError = "password is invalid \r\n";
    }
    if(preg_match("/^[a-zA-z0-9]*$/", $req_data->captchaAns)){//only letters and numbers allowed
        $validCaptcha = true;
    }else{
        $validCaptcha = false;
        $captchaError = "invalid CAPTCHA only letters and numbers allowed \r\n";
    }

    if($validPassword && $validEmail && $validCaptcha) {//if all inputs are valid then check them again db
                
        //get user info for target account
        $q = "SELECT PasswordHash, UserID, IsStaff FROM Users WHERE Email = '" . $req_data->email ."'";
        $userData = mysqli_query( $db, $q );
        $userData = mysqli_fetch_all( $userData );
        //var_dump($userData);
        $passwordHash = $userData[0][0];
        $userID = $userData[0][1];
        $isStaff = $userData[0][2];
    
        //get correct CAPTCHA answer
        $q = "SELECT Answer FROM CAPTCHA WHERE CAPTCHAID = ".$req_data->captchaID.";";
        $captchaAns = mysqli_query( $db, $q );
        $captchaAns = mysqli_fetch_all( $captchaAns )[0][0];
    
        //var_dump( $captchaAns );
        //var_dump($req_data->captchaAns);
        if($captchaAns === $req_data->captchaAns){// if CAPTCHA ans is correct check password
            if(password_verify($req_data->password, $passwordHash)){//check if (hashses of) passwords match
                $response = array(
                    "success" => true,
                    "userID"=> $userID
                );
                session_start();
                session_regenerate_id();
                $_SESSION['ID'] = session_id();
                $_SESSION['userID'] = $userID;
                $_SESSION['password'] = $req_data->password;//fine to store password here as it was hashed client side
                $_SESSION['isStaff'] = $isStaff;
                if(!empty($_SERVER['HTTP_CLIENT_IP'])){
                    $ip=$_SERVER['HTTP_CLIENT_IP'];
                  }
                  elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
                    $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
                  }
                  else{
                    $ip=$_SERVER['REMOTE_ADDR'];
                  }
                  $_SESSION['IP'] = $ip;
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
    }else{//build error msg for invalid input(s)
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
        var_dump($req_data->password);
    }
    
    $responseData = json_encode($response);
    mysqli_close($db);
    echo $responseData;
?>