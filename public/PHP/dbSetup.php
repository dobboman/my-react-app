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
                        FullName varchar(50) NOT NULL,
                        Email varchar(50) NOT NULL, 
                        PhoneNumber int NOT NULL,
                        PasswordHash varchar(256) NOT NULL,
                        IsStaff boolean NOT NULL
                        );";
        $db->query($sqlQuery);
        $sqlQuery = "CREATE TABLE Items(
                        ItemID int UNSIGNED AUTO_INCREMENT NOT NULL,
                        ItemName varchar(30) NOT NULL,
                        ImageURL varchar(80) NOT NULL,
                        Price float UNSIGNED NOT NULL,
                        ProductCatagory varchar(30) NOT NULL,
                        PRIMARY KEY (ItemID)

                    );";
        $db->query($sqlQuery);
        $sqlQuery = "CREATE TABLE Orders(
                        OrderID int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
                        UserID int(10) UNSIGNED NOT NULL,
                        OrderDate DATETIME NOT NULL,
                        OrderStatus Varchar(20) NOT NULL,
                        OrderPrice float UNSIGNED NOT NULL,
                        PRIMARY KEY (OrderID),
                        FOREIGN KEY (UserID) REFERENCES Users (UserID)
                    );";
        $db->query($sqlQuery);
        $sqlQuery = "CREATE TABLE OrderItems(
                        OrderID int UNSIGNED NOT NULL,
                        ItemID int UNSIGNED NOT NULL,
                        Qauntity int UNSIGNED NOT NULL,
                        CONSTRAINT PK_OrderItems PRIMARY KEY (ItemID,OrderID),
                        FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
                        FOREIGN KEY (ItemID) REFERENCES Items (ItemID)
                    );";
        $db->query($sqlQuery);
        $sqlQuery = "CREATE TABLE CAPTCHA (
                        CAPTCHAID int UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
                        Answer VARCHAR(5) NOT NULL
        );";
        $db->query($sqlQuery);

        $sqlQuery = "INSERT INTO CAPTCHA (Answer) VALUES ('Aeik2'), ('ecb4f'), ('7plbJ8'), ('24quJ')";
        $db->query($sqlQuery);
        $sqlQuery = "   INSERT INTO Items (ItemName, ImageURL, price, ProductCatagory) VALUES ('Carrot', 'http://localhost/GroceryGuys/productImages/carrot.png', 10.00, 'Vegetables'), ('Cabbage', 'http://localhost/GroceryGuys/productImages/cabbage.png', 10.50, 'Vegetables'), ('Sprouts 200g', 'http://localhost/GroceryGuys/productImages/sprouts.png', 11.99, 'Vegetables'),
                                                                                        ('8oz Rump Steak', 'http://localhost/GroceryGuys/productImages/rumpSteak8oz.png', 14.99, 'Beef'), ('Minced Beef 500g', 'http://localhost/GroceryGuys/productImages/mincedBeef500g.png', 8.89, 'Beef'), ('10oz Sirlion Steak', 'http://localhost/GroceryGuys/productImages/sirlionSteak10oz.png', 16.00, 'Beef'),
                                                                                        ('Salmon Slices', 'http://localhost/GroceryGuys/productImages/salmonSlices.png', 6.50, 'Fish'), ('Tuna Can', 'http://localhost/GroceryGuys/productImages/tunaCan.png', 4.59, 'Fish'), ('Sushi Box', 'http://localhost/GroceryGuys/productImages/sushiBox.png', 5.70, 'Fish'),
                                                                                        ('Smoked Bacon', 'http://localhost/GroceryGuys/productImages/smokedBacon.png', 3.50, 'Pork'), ('Un-Smoked Bacon', 'http://localhost/GroceryGuys/productImages/unsmokedBacon.png', 3.50, 'Pork'), ('Gammon Steak', 'http://localhost/GroceryGuys/productImages/gammonSteak.png', 3.50, 'Pork'),
                                                                                        ('Rotisery Chicken', 'http://localhost/GroceryGuys/productImages/rotiseryChicken.png', 6.80, 'Chicken'), ('Chicken Drumsticks', 'http://localhost/GroceryGuys/productImages/chickenDrumsticks.png', 4.50, 'Chicken'), ('Chiken Ceasar Salad', 'http://localhost/GroceryGuys/productImages/chickenCaeserSalad.png', 3.50, 'Chicken');";
        $db->query($sqlQuery);

        $pass = hash("sha256", "password");
        $pass = password_hash($pass,CRYPT_SHA256);
        $sqlQuery = "INSERT INTO Users (FullName, Email,PhoneNumber,PasswordHash, IsStaff) VALUES ('Oscar Dobbin','demo@gmail.com',07711111111,'".$pass."', true );";
        $db->query($sqlQuery);
        
        /*$sqlQuery = "INSERT INTO OrderItems,  (OrderID, ItemID, Qauntity) VALUES (0,12,2), (0,7,1), (0,8,4)";
        $db->query($sqlQuery);*/

        $sqlQuery = "INSERT INTO Orders (UserID, OrderDate, OrderPrice, OrderStatus) VALUES (1,'2025-03-13 11:20:00','20.00','Pending'),(1,'2025-03-13 11:00:00','40.00','Pending'),(1,'2025-03-13 10:01:00','20.00','Pending'),(1,'2025-03-14 09:15:00','20.00','Pending');";
                                                                //SELECT UserID FROM Users WHERE UserID = 0;";
        $db->query($sqlQuery);

        $sqlQuery = "INSERT INTO OrderItems (OrderID, ItemID, Qauntity) VALUES (1,1,1), (1,2,1), (1,3,2);";
        $db->query($sqlQuery);

        mysqli_close($conn);
        mysqli_close($db);
?>