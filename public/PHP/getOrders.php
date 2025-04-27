<?php
    session_start();
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");
    $raw_req = file_get_contents('php://input');
    $req_data = json_decode($raw_req);

    $q = "SELECT PasswordHash, IsStaff FROM Users WHERE UserID = '". $_SESSION["userID"] ."'";
    $userData = mysqli_query($db, $q);
    $userData = mysqli_fetch_all($passwordHash);
    $passwordHash = $userData[0][0];
    $isStaff = $userData[0][1];
    
    if ($isStaff){
        if(password_verify($_SESSION["userID"], $passwordHash)){ //comented out for testing 
            $q = "SELECT Orders.OrderID, Users.Email, Users.FullName, Orders.OrderDate, Orders.OrderStatus, Orders.OrderPrice FROM Orders
                    INNER JOIN Users ON Users.UserID=Orders.UserID;";
            $orderData = mysqli_query($db,$q);
            $orderData = mysqli_fetch_all($orderData);
            $response = array(
                "success"=> true,
                "data"=> $orderData
            );
        }else{
            $response = array(
                "success"=>false,
                "error"=> "incorrect user data in session"
            );
        }
    }else{
        $response = array(
            "success"=>false,
            "error"=> "user is not a staff member"
        );
    }

    mysqli_close($db);
    echo json_encode($response);
?>