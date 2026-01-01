import { transporter } from "../../../configs/nodemailer.config";

/**
 * Sends an email using the provided mail object.
 * @param mail - The email configuration object containing recipient, subject, and body.
 * @returns A promise that resolves when the email is sent successfully.
 * @throws Will throw an error if the email sending fails.
 */
export default async function transportMail (mail: any) {
    const response = await transporter.sendMail(mail);
    return response;
}



