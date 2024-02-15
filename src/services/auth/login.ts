import LoginPayload from "@/types/auth/LoginPayload";
import LoginResponse from "@/types/auth/LoginResponse";
import AppResponse from "@/types/common/AppResponse";
import handleApiError from "@/utils/api-error/handleApiError";
import axiosInstance from "@/utils/axios/axiosInstance";
import {API_ENDPOINT} from "@env";

const login = async (
  payload: LoginPayload,
): Promise<AppResponse<LoginResponse>> => {
  const response = await axiosInstance.post(
    `${API_ENDPOINT}/v1/auth/login`,
    payload,
  );

  return response.data;
};

export default handleApiError(login);
