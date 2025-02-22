import { Request } from "express";

export interface IJwtPayload {
  user_id: number;
  username: string;
  iat?: number;
  exp?: number;
}

interface IRequestBodyUser {
  user_id: number;
  username: string;
}
export interface IRequestBody {
  user: IRequestBodyUser;
}

export interface IExtendedRequest extends Request {
  user?: IJwtPayload;
}
