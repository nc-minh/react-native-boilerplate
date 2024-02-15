import {StackNavigationOptions} from "@react-navigation/stack";
import React from "react";

export default interface RouteItem {
  name: string;
  component: React.ComponentType;
  options?: StackNavigationOptions;
  headerTitleKey?: string;
}
