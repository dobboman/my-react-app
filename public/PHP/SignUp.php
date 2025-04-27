<?php
    
    $raw_req = file_get_contents("php://input");
    $req_data = json_decode($raw_req);

    $password = password_hash($req_data->password, CRYPT_SHA256);
    
    
    $db = new mysqli("localhost","root","","GrocceryGuyDatabase");
    $q = "SELECT Email FROM Users WHERE Email = '".$req_data->username."'";
    $req_email = mysqli_query($db, $q);
    $email = mysqli_fetch_all($req_email)[0][0];

    if ($email == $req_data->username){
        $response = array(
            "sucess"=>false,
            "error"=> "account with this email address already exists"
        );
    }else{
        $q = "INSERT INTO Users (email, FullName, PhoneNumber ,passwordHash, IsStaff) VALUES ('". $req_data->email ."', ". $req_data->username .", ". strval($req_data->phoneNumber) .", '". $password ."', false)";
        mysqli_query($db, $q);

        $q = "SELECT UserID for Users WHERE Email = " . $req_data->email .";";
        $userID = mysqli_query($db, $q);
        $userID = mysqli_fetch_all($userID)[0][0];

        session_start();
        session_regenerate_id();
        $_SESSION["ID"] = session_id();
        $_SESSION["userID"] = $userID;
        $_SESSION["password"] = $req_data->password;
        $_SESSION["isStaff"] = false;

        $response = array(
            "success"=>true,
            "userID"=> $userID
        );
    }
    mysqli_close($db);
    echo json_encode($response);
    
?>