<?php
    //$raw_req =  sanitize(file_get_contents('php://input'));
    $raw_req =  $_POST[""];
    $catagory = json_decode($raw_req);
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");

    //check user details here 

    //get data needed for entry
    $orderStatus = "Pending";
    $date = date("YYYY-mm-dd h:i:sa");
    $orderPrice = 00.00;

    
    for ($i = 0; $i < $req_data->data; $i++) {//get price from db to stop user submiting incorrect price by editing js
        $q = "SELECT Price FROM Items WHERE ItemID = ".$req_data->data[$i].";";
        $price = mysqli_query($db, $q);
        $orderPrice += $req_data->data[$i][3] * $price;
    }

    $q = "INSERT INTO Orders(UserID, OrderDate, OrderPrice, OrderStatus) VALUES (".$userID.", '".$date."',".$orderPrice.",'".$orderStatus."')";
    $result = mysqli_query($db, $q);

    $q = "SELECT OrderID FROM Orders WHERE OrderDate = ".$date." AND UserID =".$userID.";";
    $orderID = mysqli_query($db, $q);

    for ($i = 0; $i < $req_data->data; $i++) {
        $q = "INSERT INTO OrderItems(OrderID, ItemID, Qauntity) VALUES (".$orderID.",".$req_data->data[$i][0].",".$req_data->data[$i][3].";";
        mysqli_query($db, $q);
    }

    mysqli_close($db);
    echo json_encode(true);
?>