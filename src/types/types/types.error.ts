export class ResultError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ResultError";
  }
}

export function CreateError(statusCode: number, message: string): ResultError {
  return new ResultError(statusCode, message);
}
