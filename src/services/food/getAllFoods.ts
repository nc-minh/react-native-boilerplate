import {PAGE_SIZE} from "@/constants/common";
import GetAllFoodsPayload from "@/types/food/GetAllFoodsPayload";
import handleApiError from "@/utils/api-error/handleApiError";
import axiosInstance from "@/utils/axios/axiosInstance";
import {API_ENDPOINT} from "@env";

const getAllFoods = async (
  payload: GetAllFoodsPayload,
  currentPage: number,
) => {
  const response = await axiosInstance.get(`${API_ENDPOINT}/v1/foods`, {
    params: {
      ...payload,
      pageSize: PAGE_SIZE,
      currentPage,
    },
  });

  return {
    data: response.data?.data || [],
    nextPage: currentPage + 1,
  };
};

export default handleApiError(getAllFoods);
