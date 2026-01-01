import { Recipient } from "../types/recipient.type";

export interface EmailServiceInterface {

  sendEmail(templateName : string, recipient : Recipient ) : Promise<void>

}