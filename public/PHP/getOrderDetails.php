<?php
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");
    $raw_req = file_get_contents('php://input');
    $req_data = json_decode($raw_req);

    /*$q = "SELECT PasswordHash FROM Users WHERE Email = '". $req_data->username ."'";
    $passwordHash = mysqli_query($db, $q);
    $passwordHash = mysqli_fetch_all($passwordHash)[0][0];
    
    /*if(password_verify($req_data->password, $passwordHash)){*/
        $q = "SELECT (OrderID, UserID, Date, Status, OrderPrice) FROM Orders WHERE OrderID = '". $req_data->OrderID ."'";
        $orderDetails = mysqli_query($db,$q);
        $orderDetails = mysqli_fetch_all($orderDetails);
        mysqli_close($db);
        echo json_decode($orderDetails);
    /*}else{
        mysqli_close($db);
        echo json_encode(false);
    }*/

?>