CREATE or ALTER PROCEDURE AddVote
    (
    @Id VARCHAR(255),
    @QuestionId VARCHAR(255),
    @ChoiceId VARCHAR(255),
    @UserId VARCHAR(255)  
)
As
BEGIN
    INSERT INTO  Votes
        (Id, QuestionId,ChoiceId, UserId)
    VALUES
        (@Id, @QuestionId, @ChoiceId, @UserId)
END