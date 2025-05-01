<?php
    $randCAPTCHAID = random_int(1,4);

    switch($randCAPTCHAID){
        case 1:
            $response = array("1","http://localhost/GroceryGuys/CAPTCHA/image1.jpg");
            break;
        case 2:
            $response = array("2","http://localhost/GroceryGuys/CAPTCHA/image2.jpg");
            break;
        case 3:
            $response = array("3","http://localhost/GroceryGuys/CAPTCHA/image3.jpg");
            break;
        case 4:
            $response = array("4","http://localhost/GroceryGuys/CAPTCHA/image4.jpg");
            break;
        default:
            break;
        }
    echo json_encode($response);
    
?>