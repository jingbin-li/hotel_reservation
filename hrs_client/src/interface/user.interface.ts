export interface IUser {
  id: string;
  username: string;
  access_token: string;
  role: "guest" | "employee";
}
