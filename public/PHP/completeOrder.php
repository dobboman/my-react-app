<?php
    session_start();
    $raw_req = file_get_contents("php://input");
    $req_data = json_decode($raw_req);
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");

    $q = "SELECT PasswordHash FROM Users WHERE UserID = ". $_SESSION["userID"] .";";
    $userData = mysqli_query($db, $q);
    $userData = mysqli_fetch_all($userData);
    $passwordHash = $userData[0][0];
    //$isStaff = $userData[0][1];

    if($_SESSION["isStaff"]){
        if(password_verify($_SESSION["password"], $passwordHash)){
            $q = "UPDATE Orders SET OrderStatus = 'Complete' WHERE OrderID = '".$req_data->orderID."';";
            $result = mysqli_query($db, $q);
            $response = array(
                "success" => true
            );
    
        }
        else{
            $response = array(
                "success"=> false,
                "error"=> "Incorrect login info in session var"
            );
        }
    }
    else{
        $response = array(
            "success"=> false,
            "error"=> "User is not staff member"
        );
    }

    mysqli_close($db);
    echo json_encode($response);
?>