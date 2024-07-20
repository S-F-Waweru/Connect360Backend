import { Request, Response } from "express"
import { v4 as uid } from 'uuid'
import { DBHelper } from "../DatabaseHelpers"
import { RegisterSchema } from "../Helper"
import { User, Payload, UserRequest } from "../Models/User"
import Bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
import { ExtendedRequest1 } from "../Middleware"

dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

const dbInstance = new DBHelper()

export const register = async (request: UserRequest, response: Response) => {
    try {
        // Get User ID
        const Id = uid()
        // Get  requirements
        console.log(request.body)
        const { Username, Email, Password, Role } = request.body
        
        // Validate
        const { error } = RegisterSchema.validate(request.body)
        if (error) {
            return response.status(400).json(error.details[0].message)
        }
        //check if user exist
        const user = (await dbInstance.exec('login', { Email })).recordset as User[]
        console.log(user)
        if (user.length !== 0) {
            return response.status(400).json({ Message: 'User Already Exist!!' })
        }
        console.log(user[0])

        const user2 = (await dbInstance.exec('checkUsername', { Username })).recordset as User[]
        if (user2.length !== 0) {
            return response.status(400).json({ Message: 'Username Already Taken!!' })
        }
        //chEck the role if Gov Update status to  pending but Role Remains Citizen
        // let RoleStatus = 'Default'
        // if (Role === 'GOv'){
        //     RoleStatus = 'Pending'
        // }
        


        //Hash the password
        const HashedPassword = await Bcrypt.hash(Password, 10)
        console.log((HashedPassword))
        // save to DB
        try {
            await dbInstance.exec('register', { Id, Username, Email, Password: HashedPassword, Role, RoleStatus });
        } catch (dbError) {
            console.error('Database Error:', dbError);
            return response.status(500).json({ message: 'Database error occurred during registration' });
        }

        return response.status(201).json({ Message: 'Registration Successful' })
    } catch (error: any) {
        return response.status(500).json(error.message)
    }

}

export const login = async (request: Request, response: Response) => {
    try {
        //get data form request
        const { Email, Password } = request.body

        //get user from Db
        let user = (await dbInstance.exec('login', { Email })).recordset as User[]
        if (user.length === 0) {
            return response.status(400).json({ Message: 'Invalid Credentials' })
        }


        // Valid password
        const isvalid = (await Bcrypt.compare(Password, user[0].Password))
        if (!isvalid) {
            return response.status(400).json({ Message: 'Invalid Credentils' })
        }

        //create payload
        const payload: Payload = {
            Sub: user[0].Id,
            Username: user[0].Username,
            Role: user[0].Role
        }

        //create token
        const Token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '2h' })


        return response.status(200).json({ message: "Login Successfull!!", Token })


    } catch (error: any) {
        return response.status(500).json(error.message)
    }
}

//background Services
export const forgotPassword = () => {
    // get 
}

export const changePassword = async (request: Request, response: Response) => {
    try {

        //get data from bbody
        const { Email, Password } = request.body

        let user = (await dbInstance.exec('login', { Email })).recordset as User[]

        if (!user) {
            return response.status(404).json({ Message: 'Invalid Creadentials' })
        }
        if (user[0].isDeleted === 1) {
            return response.status(404).json({ Message: 'Invalid Creadentials' })
        }
        // update password from db
        dbInstance.exec('', { Email, Password })

        return response.status(200).json({ Message: 'Password Changed Successfully' })

    } catch (error: any) {
        return response.status(500).json(error.message)
    }

}

export const deleteUser = async (request: ExtendedRequest1, response: Response) => {

    const role = request.info?.Role
    if(!role){return response.status(401).json({Message:'Forbidden!'})}
        
    const {Email} = request.body
    //get User id/Email/username
    const dUser =(await  dbInstance.exec('login',{Email}) ).recordset  as User[]

    if(dUser.length === 0){
        return response.status(404).json({Message:"User Not Found"})
    }
    // update is deleted
    try {
        dbInstance.exec('deleteUser',{Email} )
    } catch (error) {
        console.log(error)
        return response.status(500).json({Message:"Database Error Occured"})
    }

}

export const approveGov = async (request: ExtendedRequest1, response: Response) => {
    const role = request.info?.Role
    if(!role){return response.status(401).json({Message:'Forbidden!'})}
        
    const {Email} = request.body
    //get User id/Email/username
    const dUser =(await  dbInstance.exec('login',{Email}) ).recordset  as User[]

    if(dUser.length === 0){
        return response.status(404).json({Message:"User Not Found"})
    }
    const RoleStatus = 'Approved'
    const Role= 'Gov'

   
    try {
        // approve
   dbInstance.exec('ApproveGov', {Email,RoleStatus, Role})
   // change status

   } catch (error) {
       return response.status(500).json({Messgae:'DatabaseError'})
   }
   return response.status(200).json({Message:'GOV Rights Approved!'})

}

export const revokeGov = async (request: ExtendedRequest1, response: Response) => {
    const role = request.info?.Role
    if(!role){return response.status(401).json({Message:'Forbidden!'})}
        
    const {Email} = request.body
    //get User id/Email/username
    const dUser =(await  dbInstance.exec('login',{Email}) ).recordset  as User[]

    if(dUser.length === 0){
        return response.status(404).json({Message:"User Not Found"})
    }
    const RoleStatus = 'Revoked'
    const Role= 'Citizen'

    try {
         // approve
    dbInstance.exec('RevokeGov', {Email,RoleStatus, Role})
    // change status

    } catch (error) {
        return response.status(500).json({Messgae:'DatabaseError'})
    }
    return response.status(200).json({Message:'GOV Rights revoked!'})
   
}