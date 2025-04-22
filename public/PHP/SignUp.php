<?php
    
    $raw_req = file_get_contents("php://input");
    $req_data = json_decode($raw_req);

    $salt = random_bytes(64);
    $password = strval($req_data->password).$salt;
    $hash = hash("sha256", $password);

    
    
    $db = new mysqli("localhost","root","","GrocceryGuyDatabase");
    $q = "INSERT INTO Users (email, PhoneNumber ,passwordHash, Salt) VALUES ('". $req_data->username ."', ". $req_data->phoneNumber .", '". $hash ."','". $salt ."' )";
    mysqli_query($db, $q);

    mysqli_close($db);
    $response = json_encode(true);
    echo $response;
?>