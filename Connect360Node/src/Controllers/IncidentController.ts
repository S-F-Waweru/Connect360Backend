import { v4 as uid } from "uuid"
import { DBHelper } from "../DatabaseHelpers"
import { json, Request, Response } from 'express'
import { Payload } from "../Models/User"
import { Incident } from "../Models/Incident"
import { LogTimings } from "concurrently"

const dbInstance = new DBHelper
// addIncident
export interface ExtendedRequest1 extends Request {
    info?: Payload
}
export const addIncident = (request: ExtendedRequest1, response: Response) => {

    try {
        const UserId = request.info?.Sub
        if (UserId === undefined) {
            return response.status(400).json({ message: "Sign up First!!" })
        }

        if (request.info?.Role !== 'Citizen') {
            return response.status(400).json({ message: "You Must be registered as a Citizen!" })
        }

        const { Incident, Description, location, ImageUrl } = request.body
        const Id = uid()



        try {
            dbInstance.exec('addIncident', { Id, UserId, Incident, Description, location, ImageUrl })
        } catch (error: any) {
            console.error('Database Error:', error);
            return response.status(500).json({ Message: 'Database error occurred during Poll Creation' })
        }
        return response.status(201).json({ Message: 'Incident Added succefully' })
    } catch (error) {
        console.error('Database Error:', error);
        return response.status(500).json({ Message: 'Database error occurred during Poll Creation' })
    }

}


// getall incidents
export const getIncidents = async (request: Request, response: Response) => {
    const incidents = (await dbInstance.exec('getAllIncidents', {})).recordset as Incident[]

    console.log(incidents);

    if (!incidents) {
        return response.status(404).json({ Message: 'No incidents Cast Yet.' })
    }

    return response.status(200).json(incidents)
}
//getIncident
export const getUserIncidents = async (request: Request, response: Response) => {

    const UserId = request.params.Id
    console.log(UserId);


    const incidents = (await dbInstance.exec('getUserIncident', { UserId: UserId })).recordset as Incident[]

    console.log(incidents);
    if (incidents.length === 0) {
        return response.status(404).json({ Message: 'No incidents Cast Yet.' })
    }

    return response.status(200).json(incidents)
}
// get user incidents
export const getIncident = async (request: Request, response: Response) => {
    const Id = request.params.Id
    const incident = (await dbInstance.exec('getIncident', { Id })).recordset as Incident[]

    if (!incident) {
        return response.status(404).json({ Message: 'No incidents Cast Yet.' })
    }

    return response.status(200).json(incident)
}

export const updateIncident = async (request: ExtendedRequest1, response: Response) => {
    const UserId = request.info?.Sub
    if (UserId === undefined) {
        return response.status(400).json({ message: "Sign up First!!" })
    }

    if (request.info?.Role !== 'Citizen') {
        return response.status(400).json({ message: "You Must be registered as a Citizen!" })
    }


    const Id = request.params.Id
    const { Incident, Description, location, ImageUrl } = request.body
    const incident = (await dbInstance.exec('getIncident', { Id })).recordset as Incident[]

    if (incident.length === 0) {
        return response.status(404).json({ Message: 'Incident Not Found' })
    }
    await dbInstance.exec('updateIncident', { Id, Incident, Description, location, ImageUrl })

    return response.status(200).json({ Message: 'Incident Updated' })
}
//delete Incidents
export const deleteIncident = async (request: ExtendedRequest1, response: Response) => {
    const UserId = request.info?.Sub
    if (UserId === undefined) {
        return response.status(400).json({ message: "Sign up First!!" })
    }

    if (request.info?.Role !== 'Citizen') {
        return response.status(400).json({ message: "You Must be registered as a Citizen!" })
    }
    const Id = request.params.Id
    const incident = (await dbInstance.exec('getIncident', { Id })).recordset as Incident[]

    if (!incident) {
        return response.status(404).json({ Message: 'Incident Not Found' })
    }

    if (incident[0].UserId !== UserId) {
        return response.status(404).json({ message: "You cannot delete another Presons Incident" })
    }

    await dbInstance.exec('Deleteincident', { Id })


    return response.status(200).json({ Message: 'Incident Deleted' })
}