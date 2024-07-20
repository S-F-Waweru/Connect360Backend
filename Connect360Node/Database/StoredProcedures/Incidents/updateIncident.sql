CREATE or ALTER PROCEDURE updateIncident
    (
     @Id VARCHAR(255), 
    @Incident VARCHAR(255),
    @Description VARCHAR(255),
    @Location VARCHAR(255),
    @ImageURL VARCHAR(255)
)
As
BEGIN
   UPDATE Incidents  SET Incident = @Incident,Description=@Description
    ,Location=@Location, ImageURL=@ImageURL WHERE Id = @Id
END