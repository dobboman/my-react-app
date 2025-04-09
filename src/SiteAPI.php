<?php
    function setUpDataBase(): void{
        $query = "CREATE DATABASE GrocceryGuyDatabase;
                    CREATE TABLE Users(
                        UserID int NOT NULL,
                        Email varchar(50) NOT NULL, 
                        PhoneNumber int NOT NULL,
                        PRIMARY KEY (UserID),
                        FOREIGN KEY (UserID) REFERENCES Orders (UserID)
                    );
                    CREATE TABLE Orders(
                        OrderID int NOT NULL,
                        UserID int NOT NULL,
                        Date DATETIME NOT NULL,
                        Status Varchar(20) NOT NULL,
                        OrderPrice int NOT NULL,
                        PRIMARY KEY (OrderID),
                        FOREIGN KEY (OrderID) REFERENCES OrderItems (OrderID)
                        FOREIGN KEY (UserID) REFERENCES Users (UserID)
                    );
                    CREATE TABLE OrderItems(
                        OrderID int NOT NULL,
                        ItemID int NOT NULL,
                        Qauntity int NOT NULL,
                        CONSTRAINT PK_OrderItems PRIMARY KEY (ItemID,OrderID),
                        FOREIGN KEY (ItemID) REFERENCES Items (ItemID)
                        FOREIGN KEY (OrderID) REFERENCES Orders (OrderID)
                    );
                    CREATE TABLE Items(
                        ItemID int NOT NULL,
                        ImageID int NOT NULL,
                        Price float NOT NULL,
                        PRIMARY KEY (ItemID),
                        FOREIGN KEY (ItemID) REFERENCES OrderItems (ItemID)
                    );
        ";
    }   
?>