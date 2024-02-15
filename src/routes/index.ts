import RouteItem from "../types/routes/RouteItem";
import Blog from "@/app/screens/Blog";
import TabNavigator from "@/app/navigators/TabNavigator";
import Authen from "@/app/screens/Authen";
import Setting from "@/app/screens/Setting";
import colors from "@/styles/colors";
import FoodDetail from "@/app/screens/FoodDetail";

const routes: RouteItem[] = [
  {
    name: "Home",
    component: TabNavigator,
  },
  {
    name: "Blog",
    component: Blog,
  },
  {
    name: "Search",
    component: TabNavigator,
  },
  {
    name: "FoodLobby",
    component: TabNavigator,
  },
  {
    name: "Authen",
    component: Authen,
  },
  {
    name: "Setting",
    component: Setting,
    options: {
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.gray,
      },
      headerTintColor: colors.lightText,
    },
    headerTitleKey: "common:setting",
  },
  {
    name: "FoodDetail",
    component: FoodDetail,
    options: {
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.gray,
      },
      headerTintColor: colors.lightText,
    },
  },
];

export default routes;
