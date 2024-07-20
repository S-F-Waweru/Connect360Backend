CREATE or ALTER PROCEDURE Addchoice
    (
    @Id VARCHAR(255),
    @QuestionId VARCHAR(255),
    @Choice VARCHAR(255)  
)
As
BEGIN
    INSERT INTO  Choices
        (Id,QuestionId,Choice)
    VALUES
        (@Id, @QuestionId, @Choice)
END