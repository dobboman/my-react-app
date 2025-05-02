<?php
    session_start();
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");
    $raw_req = file_get_contents('php://input');
    $req_data = json_decode($raw_req);

    //get stored user data
    $q = "SELECT PasswordHash, IsStaff FROM Users WHERE UserID = '". $_SESSION["userID"] ."'";
    $userData = mysqli_query($db, $q);
    $userData = mysqli_fetch_all($userData);
    $passwordHash = $userData[0][0];
    $isStaff = $userData[0][1];

    //get IP of connecting device
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
        $ip=$_SERVER['HTTP_CLIENT_IP'];
      }
      elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
      }
      else{
        $ip=$_SERVER['REMOTE_ADDR'];
      }
    
    if ($isStaff && $_SESSION["IP"] === $ip){//verify IP to stop session hijacking
        if(password_verify($_SESSION["password"], $passwordHash)){ //verify password
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