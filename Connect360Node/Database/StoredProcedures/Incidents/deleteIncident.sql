CREATE or ALTER PROCEDURE Deleteincident(
    @Id VARCHAR(255)
)
As
BEGIN
    DELETE FROM Incidents WHERE Id = @Id
END