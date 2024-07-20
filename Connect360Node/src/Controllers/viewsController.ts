import { v4 as uid } from "uuid"
import { DBHelper } from "../DatabaseHelpers"
import {json, Request , Response} from 'express'
import { Payload } from "../Models/User"
import { View } from "../Models/View"
import { LogTimings } from "concurrently"

const dbInstance = new DBHelper
// addView
export interface ExtendedRequest1 extends Request {
    info?: Payload
}
export const addView =(request:ExtendedRequest1, response:Response)=>{

    try {
        const UserId = request.info?.Sub
        if (UserId === undefined) {
            return response.status(400).json({ message: "Sign up First!!" })
        }
        
        if (request.info?.Role !== 'Citizen') {
            return response.status(400).json({ message: "You Must be registered as a Citizen!" })
        }

        const {Title, Body} =request.body
        const Id = uid()
    
       

        try {
            dbInstance.exec('AddView', {Id,UserId, Title, Body})
        } catch (error:any) {
            console.error('Database Error:', error);
            return response.status(500).json({ Message: 'Database error occurred during Poll Creation'})
        }
        return response.status(201).json({Message:'View Added succefully'})
    } catch (error) {
        console.error('Database Error:', error);
        return response.status(500).json({ Message: 'Database error occurred during Poll Creation'})
    }
  
}


// getall views
export const getViews = async (request:Request, response:Response) =>{
    const views = (await dbInstance.exec('GetAllviews', {})).recordset as View[]

    console.log(views);
    
    if(!views){
        return response.status(404).json({Message:'No views Cast Yet.'})
    }

    return response.status(200).json(views)
}
//getView
export const getUserViews = async (request:Request, response:Response) =>{

    const UserId = request.params.Id
    console.log(UserId);
    
    
    const views = (await dbInstance.exec('GetAllUserViews', {UserId : UserId})).recordset as View[]

    console.log(views);
    if(views.length === 0){
        return response.status(404).json({Message:'No views Cast Yet.'})
    }

    return response.status(200).json(views)
}
// get user views
export const getView = async (request:Request, response:Response) =>{
    const Id = request.params.Id
    const view = (await dbInstance.exec('Getview', {Id})).recordset as View[]

    if(!view){
        return response.status(404).json({Message:'No views Cast Yet.'})
    }

    return response.status(200).json(view)
}

export const updateView = async (request:ExtendedRequest1, response:Response) =>{
    const UserId = request.info?.Sub
    if (UserId === undefined) {
        return response.status(400).json({ message: "Sign up First!!" })
    }
    
    if (request.info?.Role !== 'Citizen') {
        return response.status(400).json({ message: "You Must be registered as a Citizen!" })
    }


    const Id = request.params.Id
    const{Title,Body} = request.body
    const view = (await dbInstance.exec('Getview', {Id})).recordset as View[]

    if(view.length===0){
        return response.status(404).json({Message:'View Not Found'})
    }
   await dbInstance.exec('updateView', {Id,Title,Body})

    return response.status(200).json({Message:'View Updated'})
}
//delete Views
export const deleteView = async (request:ExtendedRequest1, response:Response) =>{
    const UserId = request.info?.Sub
    if (UserId === undefined) {
        return response.status(400).json({ message: "Sign up First!!" })
    }
    
    if (request.info?.Role !== 'Citizen') {
        return response.status(400).json({ message: "You Must be registered as a Citizen!" })
    }
    const Id = request.params.Id
    const view = (await dbInstance.exec('Getview', {Id})).recordset as View[]

    if(view.length === 0){
        return response.status(404).json({Message:'View Not Found'})
    }

    if(view[0].UserId !== UserId){
        return response.status(404).json({ message: "You cannot delete another Presons View" })
    }

    await dbInstance.exec('DeleteView', {Id})


    return response.status(200).json({Message:'View Deleted'})
}