<?php
    session_start();
    $raw_req =  file_get_contents('php://input');
    $req_data = json_decode($raw_req);
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");

    if(preg_match("/^[1-9]*$/", $req_data->data[1])){
        $validItemID = true;
    }else{
        $validItemID = false;
        $itemIDError = "invalid ItemID \r\n";
    }
    if(preg_match("/^[1-9]*$/", $req_data->data[3])){
        $validQuantity = true;
    }else{
        $validQuantity = false;
        $quantityError = "invalid quantity \r\n";
    }

    if($validItemID && $validQuantity){
        if(isset($_SESSION["userID"])){
            $q = "SELECT PasswordHash FROM Users WHERE UserID = ".$_SESSION["userID"].";";
            $passwordHash = mysqli_query($db, $q);
            $passwordHash = mysqli_fetch_all($passwordHash)[0][0];
            if(password_verify($_SESSION["password"],$passwordHash)){
                //get data needed for entry
                $orderStatus = "Pending";
                $date = date("Y-m-d H:i:s");
                var_dump($date);
                $orderPrice = 00.00;
            
                var_dump($req_data->data);
                for ($i = 0; $i < count($req_data->data); $i++) {//get price from db to stop user submiting incorrect price by editing js
                    $q = "SELECT Price FROM Items WHERE ItemID = ".$req_data->data[$i][0].";";
                    $price = mysqli_query($db, $q);
                    $price = mysqli_fetch_all( $price)[0][0];
                    $orderPrice += $req_data->data[$i][3] * $price;
                }
            
                $q = "INSERT INTO Orders(UserID, OrderDate, OrderPrice, OrderStatus) VALUES (".$_SESSION["userID"].", '".$date."',".$orderPrice.",'".$orderStatus."')";
                $result = mysqli_query($db, $q);
            
                $q = "SELECT OrderID FROM Orders WHERE OrderDate = '".$date."' AND UserID =".$_SESSION["userID"].";";
                $orderID = mysqli_query($db, $q);
                $orderID = mysqli_fetch_all($orderID)[0][0];
            
                for ($i = 0; $i < count($req_data->data); $i++) {
                    $q = "INSERT INTO OrderItems(OrderID, ItemID, Qauntity) VALUES (".$orderID.",".$req_data->data[$i][0].",".$req_data->data[$i][3].");";
                    mysqli_query($db, $q);
                }
    
                $response = array(
                    "success"=> true,
                );
            }else{
                $response = array(
                    "success"=> false,
                    "error"=> "incorrect user details stored in session"
                );
            }
        
        }else{
            $response = array(
                "success"=> false,
                "error"=> "please login to order items"
            );
        }
    }else{
        $errorMsg = "";
        if(!$validItemID){
            $errorMsg .= $itemIDError;
        }
        if(!$validQuantity){
            $errorMsg .= $quantityError;
        }
        $response = array(
            "success"=> false,
            "error"=> $errorMsg
        );
    }

    mysqli_close($db);
    echo json_encode($response);
?>