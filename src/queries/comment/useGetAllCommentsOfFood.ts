import {useQuery} from "@tanstack/react-query";

import {CURRENT_PAGE_DEFAULT} from "@/constants/common";
import getAllCommentsOfFood from "@/services/comment/getAllCommentsOfFood";
import GetAllCommentsOfFoodPayload from "@/types/comment/GetAllCommentsOfFoodPayload";

export const GET_ALL_COMMENTS_OF_FOOD_QUERY_KEY = "useGetAllCommentsOfFood";

export const useGetAllCommentsOfFood = (payload: GetAllCommentsOfFoodPayload) =>
  useQuery({
    queryKey: [GET_ALL_COMMENTS_OF_FOOD_QUERY_KEY],
    queryFn: () => getAllCommentsOfFood(payload, CURRENT_PAGE_DEFAULT),
    enabled: !!payload.foods_id,
  });
