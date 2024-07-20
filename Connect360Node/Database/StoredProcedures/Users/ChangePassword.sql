CREATE or ALTER PROCEDURE changePassword
(
    @Email VARCHAR(255),
    @Password VARCHAR(255)
)
As
BEGIN
    UPDATE Users SET Password = @Password WHERE Email= @Email
END