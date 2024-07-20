CREATE or ALTER PROCEDURE addIncident(
    @Id VARCHAR(255),
    @UserId VARCHAR(255),
    @Incident VARCHAR(255),
    @Description VARCHAR(255),
    @Location VARCHAR(255),
    @ImageURL VARCHAR(255)
)
AS 
BEGIN
    INSERT INTO Incidents (Id, UserId, Incident, Description,Location, ImageURL)
    VALUEs(@Id, @UserId, @Incident, @Description,@Location, @ImageURL)
END