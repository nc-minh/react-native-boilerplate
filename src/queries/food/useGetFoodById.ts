import {useQuery} from "@tanstack/react-query";

import {STALE_TIME} from "@/constants/reactQuery";
import getFoodById from "@/services/food/getFoodById";
import GetFoodByIdPayload from "@/types/food/GetFoodByIdPayload";

export const GET_FOOD_BY_ID_QUERY_KEY = "getFoodById";

export const useGetFoodById = (payload: GetFoodByIdPayload, enabled = true) =>
  useQuery({
    queryKey: [GET_FOOD_BY_ID_QUERY_KEY, payload],
    queryFn: () => getFoodById(payload),
    staleTime: STALE_TIME.FIVE_MINS,
    enabled: !!payload.id || enabled,
  });
