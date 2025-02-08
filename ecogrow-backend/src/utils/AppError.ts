export default class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}