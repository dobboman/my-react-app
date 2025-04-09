<?php
        $servername = "localhost";
        $username="root";
        $password= "";
        $conn = new mysqli($servername, $username, $password);
        if ($conn->connect_error) {
            die("Connection Failed". $conn->connect_error);
        }
        $sqlQuery ="DROP DATABASE GrocceryGuyDatabase;";
        $conn->query($sqlQuery);
        $sqlQuery = "CREATE DATABASE GrocceryGuyDatabase;";
        $conn->query($sqlQuery);

        $db = new mysqli($servername, $username, $password,"GrocceryGuyDatabase"); 
        $sqlQuery = "CREATE TABLE Users(
                        UserID int(10) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY ,
                        Email varchar(50) NOT NULL, 
                        PhoneNumber int
                        );";
        $db->query($sqlQuery);
        $sqlQuery = "CREATE TABLE Orders(
                        OrderID int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
                        UserID int(10) UNSIGNED NOT NULL,
                        Date DATETIME NOT NULL,
                        Status Varchar(20) NOT NULL,
                        OrderPrice int UNSIGNED NOT NULL,
                        PRIMARY KEY (OrderID),
                        FOREIGN KEY (UserID) REFERENCES Users (UserID)
                    );";
        $db->query($sqlQuery);
        $sqlQuery = "CREATE TABLE OrderItems(
                        OrderID int UNSIGNED AUTO_INCREMENT NOT NULL,
                        ItemID int UNSIGNED NOT NULL,
                        Qauntity int UNSIGNED NOT NULL,
                        CONSTRAINT PK_OrderItems PRIMARY KEY (ItemID,OrderID),
                        FOREIGN KEY (OrderID) REFERENCES Orders (OrderID)
                    );";
        $db->query($sqlQuery);
        $sqlQuery = "CREATE TABLE Items(
                        ItemID int UNSIGNED AUTO_INCREMENT NOT NULL,
                        ItemName varchar(30) NOT NULL,
                        ImageID int UNSIGNED NOT NULL,
                        Price float UNSIGNED NOT NULL,
                        Catagory varchar(30) NOT NULL,
                        Type varchar(30),

                        PRIMARY KEY (ItemID)

                    );";
        $db->query($sqlQuery);
        $sqlQuery = "   INSERT INTO Items (ItemName, ImageID, price, Catagory) VALUES ('Carrot', 0, 10.00, 'Veg'), ('Cabbage', 1, 10.50, 'Veg'), ('Sprout', 2, 11.99, 'Veg');
        ";
        $db->query($sqlQuery);  

        mysqli_close($conn);
        mysqli_close($db);
?>