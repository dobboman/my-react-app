<?php
    $raw_req = file_get_contents("php://input");
    $req = json_decode($raw_req);

    $response = true;
    $responseData = json_encode($response);
    echo $responseData;
?>