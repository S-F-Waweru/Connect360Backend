Create TABLE Choices (
    Id VARCHAR(255) PRIMARY KEY NOT NULL,
    QuestionId VARCHAR(255),
    Choice VARCHAR(255),
    FOREIGN KEY (QuestionId) REFERENCES Questions (Id) 
    ON DELETE CASCADE
)