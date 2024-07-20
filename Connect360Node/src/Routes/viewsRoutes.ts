import { Router } from "express";
import { verifyToken } from "../Middleware";
import { addView, deleteView, getUserViews, getView, getViews, updateView } from "../Controllers/viewsController";


export const viewRouter = Router()

viewRouter.post('/add', verifyToken, addView)
viewRouter.get('', getViews)
viewRouter.get('/:Id',verifyToken, getUserViews)
viewRouter.get('/view/:Id', getView)
viewRouter.delete('/delete/:Id',verifyToken, deleteView)
viewRouter.put('/update/:Id',verifyToken, updateView)



