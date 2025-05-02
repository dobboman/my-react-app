<?php
    $db = new mysqli("localhost", "root", "","GrocceryGuyDatabase");
    $raw_req = file_get_contents('php://input');

    $q = "SELECT * FROM Items;";
    $result = mysqli_query($db, $q);
    $data = mysqli_fetch_all($result);

    $dataJSON = json_encode($data);
    mysqli_close($db);
    echo $dataJSON;

?>