import Category from "@/types/category/Category";
import handleApiError from "@/utils/api-error/handleApiError";
import axiosInstance from "@/utils/axios/axiosInstance";
import {API_ENDPOINT} from "@env";

const getAllCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get(`${API_ENDPOINT}/v1/categories`);

  return response.data?.data || [];
};

export default handleApiError(getAllCategories);
