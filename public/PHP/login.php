<?php
    $raw_req = file_get_contents("php://input");
    $req_data = json_decode($raw_req);

    //validate inputs here 

    $db = new mysqli("localhost","root","","GrocceryGuyDatabase");
       
    $q = "SELECT PasswordHash, UserID FROM Users WHERE Email = '" . $req_data->username ."'";
    $userData = mysqli_query( $db, $q );
    $userData = mysqli_fetch_all( $userData );
    $passwordHash = $userData[0][0];
    $userID = $userData[0][1];
    $isStaff = $userData[0][2];
    
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
    }else{
        $response = array(
            'success'=> false
        );
    }
    $responseData = json_encode($response);
    mysqli_close($db);
    echo $responseData;
?>