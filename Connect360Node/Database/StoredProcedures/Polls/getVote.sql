CREATE or ALTER PROCEDURE GetVote
    (
    @UserId VARCHAR(255)  ,
    @QuestionId VARCHAR(255)
)
As
BEGIN
    SELECT * FROM Votes WHERE UserId = @UserId AND QuestionId = @QuestionId
END