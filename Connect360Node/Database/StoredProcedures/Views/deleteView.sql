CREATE or ALTER PROCEDURE DeleteView(
    @Id VARCHAR(255)
)
As
BEGIN
    DELETE FROM Views WHERE Id = @Id
END