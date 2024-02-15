import React, {useCallback} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useShallow} from "zustand/react/shallow";

import colors from "@/styles/colors";
import {useAuthenStore} from "@/store/useAuthenStore";
import useAppNavigation from "@/hooks/useAppNavigation";

function User(): React.JSX.Element {
  const navigation = useAppNavigation();

  const {user} = useAuthenStore(
    useShallow(state => ({
      user: state.user,
    })),
  );

  const handleGoToSettingScreen = useCallback(
    () => navigation.navigate("Setting"),
    [navigation],
  );

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <MaterialCommunityIcons
            name="chef-hat"
            color={colors.lightText}
            size={24}
          />

          <Text>{user?.username}</Text>
        </View>

        <View>
          <Pressable onPress={handleGoToSettingScreen}>
            <AntDesign name="setting" color={colors.lightText} size={24} />
          </Pressable>
        </View>
      </View>
      <ScrollView style={styles.container} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    height: "100%",
  },
  homeCategorySection: {
    marginBottom: 6,
  },
  homeMostFamousFood: {
    marginBottom: 6,
  },
  header: {
    backgroundColor: colors.gray,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    height: 60,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default User;
