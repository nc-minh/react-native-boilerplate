import RegisterPayload from "@/types/auth/RegisterPayload";
import RegisterResponse from "@/types/auth/RegisterResponse";
import AppResponse from "@/types/common/AppResponse";
import handleApiError from "@/utils/api-error/handleApiError";
import axiosInstance from "@/utils/axios/axiosInstance";
import {API_ENDPOINT} from "@env";

const register = async (
  payload: RegisterPayload,
): Promise<AppResponse<RegisterResponse>> => {
  const response = await axiosInstance.post(
    `${API_ENDPOINT}/v1/auth/register`,
    payload,
  );

  return response.data;
};

export default handleApiError(register);
