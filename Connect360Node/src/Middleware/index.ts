import { NextFunction, Request, Response } from "express";
import { Payload } from "../Models/User";
import jwt from 'jsonwebtoken';

export interface ExtendedRequest1 extends Request{
    info? : Payload
}

export const verifyToken = (request:ExtendedRequest1, response:Response, next:NextFunction)=>{
    try {
        const token = request.headers['token'] as string
        if(!token){
            return response.status(401).json({Message : "You must sign in First!"})
        }
        const decodedData = jwt.verify(token, process.env.SECRET as string) as Payload
        request.info = decodedData
        
    } catch (error:any) {
        return response.status(500).json(error)
    }
    next()
}