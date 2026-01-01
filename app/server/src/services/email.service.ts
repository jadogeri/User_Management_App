
import { Service } from "../decorators";
import { EmailServiceInterface } from "../interfaces/email-service.interface";
import { EmailContext } from "../models/email-context.model";
import { loadTemplate } from "../tools/mail/utils/loadTemplate"
import transportMail from "../tools/mail/utils/transportMail"
import { Mail } from "../types/mail.type";
import { Recipient } from "../types/recipient.type";


@Service()
class EmailService implements EmailServiceInterface{

  private readonly emailContext: EmailContext;
  constructor(){
    this.emailContext = new EmailContext();
  }        

  public async sendEmail(templateName : string, recipient : Recipient ) : Promise<void> {
    console.log("In EmailService.sendEmail with templateName:", templateName, "and recipient:", recipient);

    recipient.username = process.env.NODEMAILER_USERNAME;
    recipient.logoUrl = this.emailContext.getLogoUrl();
    recipient.company = this.emailContext.getCompany();
    recipient.year = this.emailContext.getYear();

    await loadTemplate(templateName, recipient)
    .then((result: any) => {
        const mail : Mail = {
            to: result.recipient.email ,
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
        .catch((error :any )=>{
            console.log("error in transportMail:", error);
            return error
        } )    

    })
    .catch((error: unknown)=>{
        return error
    })    
  
  }
}    

export default EmailService;




















/**
 * 

   .then((user: IUser)=>{
 
     let recipient : Recipient= {username : user.username, email: user.email, company : company}  
 try{  
    sendEmail('register-account', recipient);
    //TODO ADD PHONE SENDING
   //  sendSms("YOUR TWILIO PHONE NUMBER",recipient)
   console.log(`User created ${JSON.stringify(user)}`);
   if (user) {
     //send response 
     res.status(201).json(user);
   }else{
     res.status(400).json({ message: "something went wrong" });
   }
 
 }catch(e){
   console.log(e)
 */