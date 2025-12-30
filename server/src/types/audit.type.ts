export type AuditType = {
  /**
   * The date and time when the auth was created.
   * @format date-time
   * @example "2024-01-01T12:00:00.000Z"
   */
  createdAt: Date;
  /**
   * The date and time when the auth was last updated.
   * @format date-time
   * @example "2024-01-01T13:00:00.000Z"
   */
  updatedAt: Date;
}