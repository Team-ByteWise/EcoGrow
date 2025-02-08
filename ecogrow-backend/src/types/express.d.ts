declare namespace Express {
  export interface Request {
    userId?: number;
    username?: string;
    email?: string;
  }
}