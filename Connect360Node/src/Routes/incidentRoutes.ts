import { Router } from "express";
import { verifyToken } from "../Middleware";
import { addIncident, getIncidents, getUserIncidents, getIncident, deleteIncident, updateIncident } from "../Controllers/IncidentController";



export const incidentRouter = Router()

incidentRouter.post('/add', verifyToken, addIncident)
incidentRouter.get('', getIncidents)
incidentRouter.get('/:Id',verifyToken, getUserIncidents)
incidentRouter.get('/incident/:Id', getIncident)
incidentRouter.delete('/delete/:Id',verifyToken, deleteIncident)
incidentRouter.put('/update/:Id',verifyToken, updateIncident)



