import ejs from "ejs"
import { DBHelper } from "../Databasehelpers"
import { sendEmail } from "../Helpers"

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

const dbinstance = new DBHelper
export const welcomeEmail = async ()=>{
    try {
        const users =(await dbinstance.query(`SELECT * FROM  Users WHERE isEmailsent=0`)).recordset as User[]
        users.forEach(user => {
            ejs.renderFile("Template/register.ejs", {name:user.Username}, (error, data) =>{
                let messageOption = {
                    to:user.Email,
                    from:process.env.Email,
                    subjet:'Welcome to Citizen connect 360',
                    html:data
                }

                sendEmail(messageOption)
                if(error){
                    console.log(error)
                }
            })
        })
        
    } catch (error) {
        console.log(error)
    }
}
export const forgotpassword = ()=>{

}