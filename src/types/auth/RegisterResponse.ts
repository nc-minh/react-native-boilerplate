import User from "../user/User";

export default interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
