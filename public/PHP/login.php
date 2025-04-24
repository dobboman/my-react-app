<?php
    $raw_req = file_get_contents("php://input");
    $req_data = json_decode($raw_req);

    $db = new mysqli("localhost","root","","GrocceryGuyDatabase");
    /*$q = "SELECT Salt FROM Users WHERE Email = '" . $req_data->username ."'";

    $salt = mysqli_query( $db, $q );
    $salt = mysqli_fetch_all($salt); */
    //var_dump($salt);
    //$passwordSalt = strval($req_data->password) . $salt[0][0];
    //var_dump($passwordSalt);
    //$hash = hash('sha256',$passwordSalt);
    //$password = password_hash($req_data->password, PASSWORD_DEFAULT);
        

    $q = "SELECT PasswordHash FROM Users WHERE Email = '" . $req_data->username ."'";
    $passwordHash = mysqli_query( $db, $q );
    $passwordHash = mysqli_fetch_all($passwordHash)[0][0];
    //var_dump($passwordHash);
    //var_dump($hash);

    /*if ($passwordHash != $password) {
        $response = false;
    } else {
        $response = true;
    }*/
    if(password_verify($req_data->password, $passwordHash)){
        $response = true;
    }else{
        $response = false;
    }
    $responseData = json_encode($response);
    mysqli_close($db);
    echo $responseData;
?>