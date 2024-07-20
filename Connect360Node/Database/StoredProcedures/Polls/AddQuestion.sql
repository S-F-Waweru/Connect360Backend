CREATE or ALTER PROCEDURE AddQuestion
    (
    @Id VARCHAR(255),
    @Question VARCHAR(255),
    @UserId VARCHAR(255)  
)
As
BEGIN
    INSERT INTO  Questions
        (Id, Question,UserId)
    VALUES
        (@Id, @Question, @UserId)
END