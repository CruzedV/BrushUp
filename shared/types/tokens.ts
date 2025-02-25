export type TRequestBodyUser = {
  user_id: number;
  username: string;
}
export type TRequestBody = {
  user: TRequestBodyUser;
}