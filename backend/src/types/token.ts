import { Request } from "express";

export interface IJwtPayload {
  userId: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface IExtendedRequest extends Request {
  user?: IJwtPayload;
}
