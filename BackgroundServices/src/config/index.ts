import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})

export const sqlConfig  ={
    user:'',
    password:'',
    database :'',
    server : '',
    pool:{
        max:10,
        min:0,
        idleTimeoutMillis:30000
    },
    option:{
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}