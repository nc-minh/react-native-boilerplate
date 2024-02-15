import type {StackScreenProps} from "@react-navigation/stack";
import FoodDetailParams from "./FoodDetailParams";

export type ApplicationStackParamList = {
  Home: undefined;
  Blog: undefined;
  Search: undefined;
  FoodLobby: undefined;
  Authen: undefined;
  Setting: undefined;
  FoodDetail: FoodDetailParams;

  // Tab
  SearchTab: undefined;
  HomeTab: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
