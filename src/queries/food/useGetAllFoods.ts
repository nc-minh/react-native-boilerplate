import {STALE_TIME} from "@/constants/reactQuery";
import getAllFoods from "@/services/food/getAllFoods";
import GetAllFoodsPayload from "@/types/food/GetAllFoodsPayload";
import {useInfiniteQuery} from "@tanstack/react-query";

const useGetAllFoods = (
  payload: GetAllFoodsPayload,
  currentPage?: number,
  enabled = true,
) => {
  return useInfiniteQuery({
    queryKey: ["fetchAllFoods", payload, currentPage], // Use an array for queryKey
    queryFn: async ({pageParam = 0}) => {
      const data = await getAllFoods(payload, pageParam);

      return data;
    },
    staleTime: STALE_TIME.FIVE_MINS,
    getNextPageParam: (lastPage: any) => {
      // Define your logic to get the next page parameter
      // For example, you might return lastPage.nextPage if it exists
      return lastPage?.data?.length ? lastPage?.nextPage : undefined;
    },
    initialPageParam: 0, // Set an initial page parameter based on your logic
    enabled: enabled,
  });
};

export default useGetAllFoods;
