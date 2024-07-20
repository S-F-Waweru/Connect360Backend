CREATE or ALTER PROCEDURE checkUsername
    (
    @Username VARCHAR(255)
    )
As
BEGIN
    SELECT *
    FROM Users
    WHERE Username = @Username
END