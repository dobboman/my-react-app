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
                        PhoneNumber int NOT NULL,
                        PasswordHash varchar(256) NOT NULL,
                        Salt varchar(64) NOT NULL
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
                                                                                        ('8oz Rump Steak', 3, 14.99, 'Beef'), ('Minced Beef 500g', 4, 8.89, 'Beef'), ('10oz Sirlion Steak', 5, 16.00, 'Beef'),
                                                                                        ('Salmon Slices', 6, 6.50, 'Fish'), ('Tuna Can', 7, 4.59, 'Fish'), ('Sushi Box', 8, 5.70, 'Fish'),
                                                                                        ('Smoked Bacon', 9, 3.50, 'Pork'), ('Non-Smoked Bacon', 10, 3.50, 'Pork'), ('Gammon Steak', 11, 3.50, 'Pork'),
                                                                                        ('Rotisery Chicken', 12, 6.80, 'Chicken'), ('Chicken Drumsticks', 13, 4.50, 'Chicken'), ('Chiken Ceasar Salad', 14, 3.50, 'Chicken');";
        $db->query($sqlQuery);
        
        $sqlQuery = "INSERT INTO Users (Email,PhoneNumber,PasswordHash,Salt) VALUES ('oscar3098@googlemail.com',07711111111,'efed9e17f63ad0801351f7dae1bf5a5e5f9213e24de45cd23c965bc2ef775e10' , '3jH7mP1q9Rz5Tn4X')";
        $db->query($sqlQuery);                                                                                     //'61ae4764bcaa044f04b0e6674d621673c6f5335dac36ac5f7cdb93d2eba5530a'

        mysqli_close($conn);
        mysqli_close($db);
?>