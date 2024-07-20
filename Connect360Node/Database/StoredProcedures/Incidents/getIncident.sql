create or ALTER PROCEDURE getIncident (
    @Id VARCHAR(255)
)
AS
BEGIN
    SELECT * from Incidents WHERE Id = @Id
END