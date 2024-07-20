import { Router } from "express";
import { register, login, forgotPassword ,changePassword, deleteUser, approveGov } from "../Controllers/authController";

 export const authRouter = Router()

 authRouter.post("/register", register)
 authRouter.post("/login", login)
 authRouter.post("/forgotPassword", forgotPassword)
 authRouter.put("/changePassword", changePassword),
 authRouter.put("/approveGov", approveGov),
 authRouter.delete("/delete/:Id", deleteUser)

 


