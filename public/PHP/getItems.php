<?php
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");
    $q = "SELECT * FROM Items";
    
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
    echo $dataJSON;

    mysqli_close($db);
?>