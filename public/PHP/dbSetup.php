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
                        ProductCatagory varchar(30) NOT NULL,
                        SubCatagory varchar(30),

                        PRIMARY KEY (ItemID)

                    );";
        $db->query($sqlQuery);
        $sqlQuery = "   INSERT INTO Items (ItemName, ImageID, price, ProductCatagory) VALUES ('Carrot', 0, 10.00, 'Vegetables'), ('Cabbage', 1, 10.50, 'Vegetables'), ('Sprout', 2, 11.99, 'Vegetables'),
                                                                                        ('8oz Rump Steak', 3, 14.99, 'Beef'), ('Minced Beef 500g', 4, 8.89, 'Beef'), ('10oz Sirlion Steak', 4, 16.00, 'Beef'),
                                                                                        ('Salmon Slices', 5, 6.50, 'Fish'), ('Tuna Can', 6, 4.59, 'Fish'), ('Sushi Box', 7, 5.70, 'Fish'),
                                                                                        ('Smoked Bacon', 8, 3.50, 'Pork'), ('Non-Smoked Bacon', 9, 3.50, 'Pork'), ('Gammon Steak', 10, 3.50, 'Pork'),
                                                                                        ('Rotisery Chicken', 11, 6.80, 'Chicken'), ('Chicken Drumsticks', 12, 4.50, 'Chicken'), ('Chiken Ceasar Salad', 13, 3.50, 'Chicken');";
        $db->query($sqlQuery);  

        mysqli_close($conn);
        mysqli_close($db);
?>