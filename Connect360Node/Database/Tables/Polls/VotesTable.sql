Create TABLE Votes
(
    Id VARCHAR(255) NOT Null,
    UserId VARCHAR(255),
    QuestionId VARCHAR(255),
    ChoiceId VARCHAR(255),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (QuestionId) REFERENCES Questions(Id),
    FOREIGN KEY (ChoiceId) REFERENCES Choices(Id),
)