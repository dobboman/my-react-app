<?php
    $db = new mysqli("localhost","root","","GrocceryGuyDatabase");
    $q = "SELECT * FROM Users WHERE Email = 'dobboz2001@gmail.com' ";

    $result = mysqli_query($db, $q);
    $responseData = mysqli_fetch_all($result);

    for ($i=0; $i < $result->num_rows; $i++) {
        echo "(".$responseData[$i][0].") (".$responseData[$i][1].") (".$responseData[$i][2].") (".$responseData[$i][3].") (".$responseData[$i][4].")\r\n";
    }

    $q = "DELETE FROM Users WHERE Email = 'dobboz2001@gmail.com' ";
    mysqli_query($db, $q);
    mysqli_close($db);
?>