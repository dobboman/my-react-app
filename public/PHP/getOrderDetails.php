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
    
    //get user IP
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
        $ip=$_SERVER['HTTP_CLIENT_IP'];
      }
      elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
      }
      else{
        $ip=$_SERVER['REMOTE_ADDR'];
      }

    if ($isStaff && $_SESSION["IP"] === $ip) {//validate user IP to stop session hijacking
        if(password_verify($_SESSION["password"], $passwordHash)) {//verify password 
            $q = "SELECT OrderItems.ItemID, Items.ItemName, OrderItems.Qauntity, Items.Price FROM 
                            OrderItems INNER JOIN Items ON OrderItems.ItemID = Items.ItemID
                                WHERE OrderItems.OrderID = '". $req_data->orderID ."';";
            $orderDetails = mysqli_query($db,$q);
            $response = array(
                "success" => true,
                "data" => mysqli_fetch_all($orderDetails)
            ); 
        }else{
            $response = array(
                "success"=> false,
                "error"=> "incorrect user data in session data"
            );
        }

    }else{
        $response = array(
            "success"=> false,
            "error"=> "user is not a staff member"
        );
    }
    mysqli_close($db);
    echo json_encode($response);

?>