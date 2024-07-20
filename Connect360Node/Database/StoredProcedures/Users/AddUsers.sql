CREATE or ALTER PROCEDURE register
    (
    @Id VARCHAR(255),
    @UserName VARCHAR(255),
    @Email VARCHAR(255),
    @Password VARCHAR(255),
    @Role VARCHAR(255),
    @RoleStatus VARCHAR(255)
)
As
BEGIN
    INSERT INTO  Users
        (Id, UserName, Email, Password, Role, RoleStatus)
    VALUES
        (@Id, @UserName, @Email, @Password, @Role, @RoleStatus )
END