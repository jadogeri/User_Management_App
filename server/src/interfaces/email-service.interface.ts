import { Recipient } from "../types/recipient.type";

export interface IEmailService {

  sendEmail (templateName : string, recipient : Recipient ) : void;

}