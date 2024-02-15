import getAllCategories from "@/services/category/getAllCategory";
import {useQuery} from "@tanstack/react-query";

const GET_ALL_CATEGORIES_QUERY_KEY = "useGetAllCategories";

export const useGetAllCategories = () =>
  useQuery({
    queryKey: [GET_ALL_CATEGORIES_QUERY_KEY],
    queryFn: () => getAllCategories(),
  });
