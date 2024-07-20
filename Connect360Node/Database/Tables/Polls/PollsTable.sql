Create TABLE Questions (
    Id VARCHAR(255) PRIMARY KEY NOT NULL,
    Question VARCHAR(255),
    UserId VARCHAR(255),
    FOREIGN KEY (UserId) REFERENCES Users (Id),
)