CREATE or ALTER PROCEDURE RevokeGov
    (
    @Email VARCHAR(255),
    @RoleStatus VARCHAR(255),
    @Role VARCHAR(255)

)
As
BEGIN
    UPDATE Users
    SET Role = @Role, RoleStatus = @RoleStatus
    WHERE Email = @Email;
END