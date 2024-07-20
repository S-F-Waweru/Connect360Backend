import { Request } from "express"
import { ExtendedRequest1 } from "../Middleware"

export interface User {
    Id:string
    Username:string
    Email:string
    Password:string
    Role:string
    RoleStatus:string
    isEmailSent:string
    isDeleted:number
}

export interface Payload {
    Sub:string
    Username:string
    Role:string
}

 interface addUser{
    Username:string
    Email:string
    Password:string
    Role:string
    RoleStatus:string

}

export interface UserRequest extends ExtendedRequest1{
    body:addUser
}
