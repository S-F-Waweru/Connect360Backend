CREATE or ALTER PROCEDURE AddView
    (
    @Id VARCHAR(255),
    @UserId VARCHAR(255),
    @Title VARCHAR(255),
    @Body VARCHAR(255)

)
As
BEGIN
    INSERT INTO  Views
        (Id,UserId,Title,Body)
    VALUES
        (@Id, @UserId,@Title,@Body)
END