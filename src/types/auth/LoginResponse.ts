import User from "../user/User";

export default interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
