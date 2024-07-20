CREATE or ALTER PROCEDURE login
    (
    @Email VARCHAR(255)
    )
As
BEGIN
    SELECT *
    FROM Users
    WHERE Email = @Email
END