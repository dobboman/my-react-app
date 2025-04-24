<?php
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");
    $raw_req = file_get_contents('php://input');
    $req_data = json_decode($raw_req);

    /*$q = "SELECT PasswordHash FROM Users WHERE Email = '". $req_data->username ."'";
    $passwordHash = mysqli_query($db, $q);
    $passwordHash = mysqli_fetch_all($passwordHash)[0][0];
    
    if(password_verify($req_data->password, $passwordHash)){*/ //comented out for testing 
        $q = "SELECT Orders.OrderID, Users.Email, Users.FullName, Orders.OrderDate, Orders.OrderStatus, Orders.OrderPrice FROM Orders
                INNER JOIN Users ON Users.UserID=Orders.UserID;";
        $orderData = mysqli_query($db,$q);
        $orderData = mysqli_fetch_all($orderData);
        echo json_encode($orderData);
    /*}else{
        echo json_encode(false);
    }*/

    mysqli_close($db);
?>