/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useTranslation} from "react-i18next";
import React from "react";
import {useShallow} from "zustand/react/shallow";
import {useNavigation} from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Home from "../screens/Home";
import Search from "../screens/Search";
import FoodLobby from "../screens/FoodLobby";
import DynamicUserTab from "../screens/DynamicUserTab";
import colors from "@/styles/colors";
import {Pressable} from "react-native";
import {useAuthenStore} from "@/store/useAuthenStore";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {accessToken} = useAuthenStore(
    useShallow(state => ({
      accessToken: state.accessToken,
    })),
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: "#AD40AF"},
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "yellow",
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={() => ({
          tabBarStyle: {
            backgroundColor: "#AD40AF",
          },
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="SearchTab"
        component={Search}
        options={() => ({
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="FoodLobbyTab"
        component={FoodLobby}
        options={() => ({
          tabBarIcon: ({color, size}) => (
            <Octicons name="diff-added" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="UserTab"
        component={DynamicUserTab}
        options={() => ({
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
          headerShown: !accessToken,
          headerLeft: () => (
            <Pressable
              style={{padding: 10}}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" color={colors.lightText} size={24} />
            </Pressable>
          ),
          headerTitle: t("common:setting"),
          headerTintColor: colors.lightText,
          headerStyle: {
            backgroundColor: colors.gray,
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
