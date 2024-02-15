import {useRoute} from "@react-navigation/native";
import type {RouteProp} from "@react-navigation/native";

import {ApplicationStackParamList} from "@/types/routes/ApplicationScreenProps";

// Define the type for route parameters
type AppRouteProp<T extends keyof ApplicationStackParamList> = RouteProp<
  ApplicationStackParamList,
  T
>;

// Create the useAppRoute hook
function useAppRoute<
  T extends keyof ApplicationStackParamList,
>(): AppRouteProp<T> {
  return useRoute();
}

export default useAppRoute;
