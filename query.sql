

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'SkiServiceManagement')
BEGIN
    CREATE DATABASE SkiServiceManagement;
END
GO

USE SkiServiceManagement;
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'ServiceOrders') AND type in (N'U'))
BEGIN
    CREATE TABLE ServiceOrders (
        OrderID INT PRIMARY KEY IDENTITY(1,1),
        CustomerName NVARCHAR(100),
        CustomerEmail NVARCHAR(100),
        CustomerPhone NVARCHAR(20),
        Priority NVARCHAR(50),
        ServiceType NVARCHAR(100),
        CreateDate DATETIME,
        PickupDate DATETIME,
        Status NVARCHAR(50) DEFAULT 'Offen',
		Comment NVARCHAR(100) DEFAULT ''
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Employees') AND type in (N'U'))
BEGIN
    CREATE TABLE Employees (
        EmployeeID INT PRIMARY KEY IDENTITY(1,1),
        Username NVARCHAR(50) UNIQUE,
        PasswordHash VARBINARY(128)
    );
END
GO