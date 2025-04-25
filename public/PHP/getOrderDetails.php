<?php
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");
    $raw_req = file_get_contents('php://input');
    $req_data = json_decode($raw_req);

    /*$q = "SELECT PasswordHash FROM Users WHERE Email = '". $req_data->username ."'";
    $passwordHash = mysqli_query($db, $q);
    $passwordHash = mysqli_fetch_all($passwordHash)[0][0];
    
    /*if(password_verify($req_data->password, $passwordHash)){*/
        $q = "SELECT OrderItems.ItemID, Items.ItemName, OrderItems.Qauntity, Items.Price FROM 
                        OrderItems INNER JOIN Items ON OrderItems.ItemID = Items.ItemID
                            WHERE OrderItems.OrderID = '". $req_data->orderID ."';";
        //echo $q;
        //WHERE OrderItems.OrderID = '". $req_data->orderID ."';";
        $orderDetails = mysqli_query($db,$q);
        //mysqli_fetch_array($orderDetails);
        $orderDetails = mysqli_fetch_all($orderDetails);
        mysqli_close($db);
        echo json_encode($orderDetails);
    /*}else{
        mysqli_close($db);
        echo json_encode(false);
    }*/

?>