CREATE or ALTER PROCEDURE updateView
    (
    @Id VARCHAR(255),
    @Title VARCHAR(255),
    @Body VARCHAR(255)
)
As
BEGIN
   UPDATE Views  SET Title = @Title,Body=@Body WHERE Id = @Id
END