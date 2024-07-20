import { Router } from "express";
import { addPoll, getAllvotes, getPolls, vote } from "../Controllers/pollController";
import { verifyToken } from "../Middleware";


export const pollsRouter = Router()

pollsRouter.post('/add', verifyToken, addPoll)
pollsRouter.get('', getPolls)
pollsRouter.post('/vote', verifyToken, vote)
pollsRouter.get('/votes', getAllvotes)

