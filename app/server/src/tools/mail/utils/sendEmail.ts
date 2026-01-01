import { Mail } from "../../../types/mail.type"
import { Recipient } from "../../../types/recipient.type"
import { loadTemplate } from "./loadTemplate"
import transportMail from "./transportMail"
export const sendEmail =  async  (templateName : string, recipient : Recipient ) =>  {

    console.log("In sendEmail with templateName:", templateName, "and recipient:", recipient); 
    await loadTemplate(templateName, recipient)
    .then((result: any) => {
        const mail : Mail = {
            to: result.recipient.email as string,
            from: recipient.company as string,
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text,            
        }    
        if(!recipient.email || recipient.email == undefined){
            throw new Error("email is required!!")
        }
        transportMail(mail)
        .then(()=>{
            console.log("sent!!")
        })
        .catch((error : unknown )=>{
            if(error instanceof Error){
                console.log("Error instance in transportMail:", error.message); 
            }
            console.log("error in transportMail:", error);
            return error
        } )    

    })
    .catch((error)=>{
        return error
    })  
    
  
}

