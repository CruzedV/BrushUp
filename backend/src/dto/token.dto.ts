import { Request } from "express";

export interface IJwtPayload {
  user_id: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface IExtendedRequest extends Request {
  user?: IJwtPayload;
}
