/**
 * @author      Joseph Adogeri
 * @since       24-DEC-2025
 * @version     1.0
 * @description configuration setting for nodemailer 
 *  
 */
import nodemailer from 'nodemailer';

const creds = { user:process?.env?.NODEMAILER_USERNAME,
    pass :process?.env?.NODEMAILER_PASSWORD};

    console.log("Nodemailer Config - User:", creds.user );
    console.log("Nodemailer Config - Pass:", creds.pass );
    console.log("company", process.env.COMPANY);

    
export const inLineCss : Function = require('nodemailer-juice');
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: creds.user,
    pass: creds.pass,
    },
    authMethod: 'PLAIN'
}).use('compile', inLineCss());



