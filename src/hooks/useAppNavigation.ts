import {ApplicationStackParamList} from "../types/routes/ApplicationScreenProps";
import {NavigationProp, useNavigation} from "@react-navigation/native";

export default function useAppNavigation() {
  return useNavigation<NavigationProp<ApplicationStackParamList>>();
}
