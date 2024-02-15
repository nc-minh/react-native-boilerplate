import {PAGE_SIZE} from "@/constants/common";
import FoodComment from "@/types/comment/FoodComment";
import GetAllCommentsOfFoodPayload from "@/types/comment/GetAllCommentsOfFoodPayload";
import handleApiError from "@/utils/api-error/handleApiError";
import axiosInstance from "@/utils/axios/axiosInstance";
import {API_ENDPOINT} from "@env";

const getAllCommentsOfFood = async (
  payload: GetAllCommentsOfFoodPayload,
  currentPage: number,
): Promise<FoodComment[]> => {
  const response = await axiosInstance.get(`${API_ENDPOINT}/v1/food-comments`, {
    params: {
      ...payload,
      pageSize: PAGE_SIZE,
      currentPage,
    },
  });

  return response.data?.data;
};

export default handleApiError(getAllCommentsOfFood);
