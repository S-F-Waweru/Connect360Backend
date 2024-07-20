create or ALTER PROCEDURE getUserIncident (
    @UserId VARCHAR(255)
)
AS
BEGIN
    SELECT * from Incidents WHERE UserId = @UserId
END