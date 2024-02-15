import {API_ENDPOINT} from "@env";

import Food from "@/types/food/Food";
import GetFoodByIdPayload from "@/types/food/GetFoodByIdPayload";
import handleApiError from "@/utils/api-error/handleApiError";
import axiosInstance from "@/utils/axios/axiosInstance";

const getFoodById = async (payload: GetFoodByIdPayload): Promise<Food> => {
  const response = await axiosInstance.get(
    `${API_ENDPOINT}/v1/foods/${payload.id}`,
  );

  return response.data?.data;
};

export default handleApiError(getFoodById);
