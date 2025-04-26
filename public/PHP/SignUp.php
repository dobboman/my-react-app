<?php
    
    $raw_req = file_get_contents("php://input");
    $req_data = json_decode($raw_req);

    $password = password_hash($req_data->password, CRYPT_SHA256);
    
    
    $db = new mysqli("localhost","root","","GrocceryGuyDatabase");
    $q = "SELECT Email FROM Users WHERE Email = '".$req_data->username."'";
    $req_email = mysqli_query($db, $q);
    $email = mysqli_fetch_all($req_email)[0][0];

    if ($email == $req_data->username){
        $response = json_encode(false);
    }else{
        $q = "INSERT INTO Users (email, FullName, PhoneNumber ,passwordHash) VALUES ('". $req_data->email ."', ". $req_data->username .", ". strval($req_data->phoneNumber) .", '". $password ."')";
        mysqli_query($db, $q);

        $response = json_encode(true);
    }
    mysqli_close($db);
    echo $response;
?>