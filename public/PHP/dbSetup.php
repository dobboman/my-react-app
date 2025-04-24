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
                        PasswordHash varchar(256) NOT NULL
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
        $sqlQuery = "   INSERT INTO Items (ItemName, ImageID, price, ProductCatagory) VALUES ('Carrot', 0, 10.00, 'Vegetables'), ('Cabbage', 1, 10.50, 'Vegetables'), ('Sprout', 2, 11.99, 'Vegetables'),
                                                                                        ('8oz Rump Steak', 3, 14.99, 'Beef'), ('Minced Beef 500g', 4, 8.89, 'Beef'), ('10oz Sirlion Steak', 5, 16.00, 'Beef'),
                                                                                        ('Salmon Slices', 6, 6.50, 'Fish'), ('Tuna Can', 7, 4.59, 'Fish'), ('Sushi Box', 8, 5.70, 'Fish'),
                                                                                        ('Smoked Bacon', 9, 3.50, 'Pork'), ('Non-Smoked Bacon', 10, 3.50, 'Pork'), ('Gammon Steak', 11, 3.50, 'Pork'),
                                                                                        ('Rotisery Chicken', 12, 6.80, 'Chicken'), ('Chicken Drumsticks', 13, 4.50, 'Chicken'), ('Chiken Ceasar Salad', 14, 3.50, 'Chicken');";
        $db->query($sqlQuery);
        
        $sqlQuery = "INSERT INTO Users (FullName, Email,PhoneNumber,PasswordHash) VALUES ('Oscar Dobbin','oscar3098@googlemail.com',07711111111,'efed9e17f63ad0801351f7dae1bf5a5e5f9213e24de45cd23c965bc2ef775e10' );";
        $db->query($sqlQuery);
        
        /*$sqlQuery = "INSERT INTO OrderItems,  (OrderID, ItemID, Qauntity) VALUES (0,12,2), (0,7,1), (0,8,4)";
        $db->query($sqlQuery);*/

        $sqlQuery = "INSERT INTO Orders (UserID, OrderDate, OrderPrice) VALUES (1,'2025-03-13 11:20:00','20.00'),(1,'2025-03-13 11:00:00','40.00'),(1,'2025-03-13 10:01:00','20.00'),(1,'2025-03-14 09:15:00','20.00');";
                                                                //SELECT UserID FROM Users WHERE UserID = 0;";
        $db->query($sqlQuery);

        $sqlQuery = "INSERT INTO OrderItems (OrderID, ItemID, Qauntity) VALUES (1,1,1), (1,2,1), (1,3,2);";
        $db->query($sqlQuery);

        mysqli_close($conn);
        mysqli_close($db);
?>