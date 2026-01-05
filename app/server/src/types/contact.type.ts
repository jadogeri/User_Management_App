import { AuditType } from "./audit.type";

export type ContactType = AuditType & {
    /**
   * The contact's identifier.
   * @example "1"
   */
id: number
  /**
   * The contact's full name.
   * @example "John Doe"
   */
  fullname: string
  /**
   * The contact's email.
   * @pattern ^(.+)@(.+)$ please provide correct email
   * @example "JohnDoe@gmail.com"
   */
  email: string;
   /**
   * The contact's phone number.
   * @example "123-456-7890"
   */
  phone: string;
    /**
   * The contact's fax number.
   * @example "123-456-7890"
   */
  fax?: string;

}