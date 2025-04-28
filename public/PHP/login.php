<?php
    $raw_req = file_get_contents("php://input");
    $req_data = json_decode($raw_req);

    //validate inputs here 

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

    /*var_dump( $captchaAns );
    var_dump($req_data->captchaAns);*/

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
            "error"=> "invalid CAPTCHA"
        );
    }

    $responseData = json_encode($response);
    mysqli_close($db);
    echo $responseData;
?>