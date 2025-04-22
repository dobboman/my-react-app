<?php
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");
    $raw_req = file_get_contents('php://input');
    $catagory = json_decode($raw_req);

    if($catagory == "Vegetables"){
        $q = "SELECT * FROM Items WHERE ProductCatagory = 'Vegetables'";
    }
    if($catagory == "Chicken"){
        $q = "SELECT * FROM Items WHERE ProductCatagory = 'Chicken'";
    }
    if($catagory == "Beef"){
        $q = "SELECT * FROM Items WHERE ProductCatagory = 'Beef'";
    }
    if($catagory == "Pork"){
        $q = "SELECT * FROM Items WHERE ProductCatagory = 'Pork'";
    }
    if($catagory == "Fish"){
        $q = "SELECT * FROM Items WHERE ProductCatagory = 'Fish'";
    }

    
    
    $result = mysqli_query($db, $q);
    $data = mysqli_fetch_all($result);
    //$numOfRows = mysqli_num_rows($result);
    /*for ($i = 0; $i < $numOfRows; $i++) {
        echo"(".$data[$i][0].",";
        echo" ".$data[$i][1].",";
        echo" ".$data[$i][2].")  ";
    }*/
    /*$d = array(
        "data"=> $data,
        "numOfRows"=> $numOfRows
    );*/

    $dataJSON = json_encode($data);
    mysqli_close($db);
    echo $dataJSON;

?>