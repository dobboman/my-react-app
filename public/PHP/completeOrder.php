<?php
    $raw_req = file_get_contents("php://input");
    $req_data = json_decode($raw_req);
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");

    /*$q = "SELECT PasswordHash FROM Users WHERE Email = '". $req_data->username ."'";
    $passwordHash = mysqli_query($db, $q);
    $passwordHash = mysqli_fetch_all($passwordHash)[0][0];
    
    /*if(password_verify($req_data->password, $passwordHash)){*/
        $q = "UPDATE Orders SET OrderStatus = 'Complete' WHERE OrderID = '".$req_data->orderID."';";
        $result = mysqli_query($db, $q);
        $response = json_encode(true);

        mysqli_close($db);
        echo $response;
    /*}else{
        mysqli_close($db);
        echo json_encode(false);
    }*/

?>