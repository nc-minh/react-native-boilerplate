import CreateNewCommentResponse from "@/types/comment/CreateNewCommentResponse";
import CreateNewFoodCommentPayload from "@/types/comment/CreateNewFoodCommentPayload";
import AppResponse from "@/types/common/AppResponse";
import handleApiError from "@/utils/api-error/handleApiError";
import axiosInstance from "@/utils/axios/axiosInstance";
import {API_ENDPOINT} from "@env";

const createNewFoodComment = async (
  payload: CreateNewFoodCommentPayload,
): Promise<AppResponse<CreateNewCommentResponse>> => {
  const response = await axiosInstance.post(
    `${API_ENDPOINT}/v1/food-comments`,
    payload,
  );

  return response.data?.data;
};

export default handleApiError(createNewFoodComment);
