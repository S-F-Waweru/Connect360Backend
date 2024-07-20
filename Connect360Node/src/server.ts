import express, { json } from 'express'
import cors from 'cors'
import { authRouter } from './Routes/authRoutes'
import { pollsRouter } from './Routes/pollsRoutes'
import { viewRouter } from './Routes/viewsRoutes'
import { incidentRouter } from './Routes/incidentRoutes'

const app = express()
//middlewares
app.use(cors())
app.use(json())

app.use("/auth",authRouter )
app.use("/polls",pollsRouter )
app.use("/views",viewRouter )
app.use("/incidents",incidentRouter )



app.listen(2000 , ()=>{
    console.log('Connect Server is Running....')
})