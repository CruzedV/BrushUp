import { Request } from "express";

export interface IJwtPayload {
  user_id: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface IExtendedRequest extends Request {
  user?: IJwtPayload;
}
