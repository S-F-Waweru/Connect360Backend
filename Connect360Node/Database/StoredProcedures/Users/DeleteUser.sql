CREATE or ALTER PROCEDURE deleteUser
(
    @Email VARCHAR(255)
)
As
BEGIN
    UPDATE Users SET isDeleted = 1 WHERE Email= @Email
END