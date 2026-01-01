// utils/ApiError.ts
export class ApiError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    // Set the prototype explicitly to make sure it works with `instanceof`
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
