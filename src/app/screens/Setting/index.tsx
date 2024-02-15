import React, {useCallback} from "react";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useShallow} from "zustand/react/shallow";

import colors from "@/styles/colors";
import useAppNavigation from "@/hooks/useAppNavigation";
import {useAuthenStore} from "@/store/useAuthenStore";
import logout from "@/utils/authen/logout";

function Setting(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useAppNavigation();

  const {accessToken, setAccessToken} = useAuthenStore(
    useShallow(state => ({
      accessToken: state.accessToken,
      setAccessToken: state.setAccessToken,
    })),
  );

  const handleRedirectToAuthen = useCallback(() => {
    navigation.navigate("Authen");
  }, [navigation]);

  const handleLogout = useCallback(() => {
    setAccessToken("");
    logout();

    navigation.navigate("Home");
  }, [navigation, setAccessToken]);
  return (
    <ScrollView style={styles.container}>
      {!accessToken && (
        <Pressable style={styles.authenBox} onPress={handleRedirectToAuthen}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="chef-hat"
              color={colors.lightText}
              size={24}
            />
          </View>

          <View>
            <Text style={styles.title}>{t("authen:loginIntoAccount")}</Text>
            <Text>{t("authen:savedOrPickFood")}</Text>
          </View>
        </Pressable>
      )}

      {accessToken && (
        <View style={styles.logoutWrapper}>
          <Pressable style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logoutText}>{t("authen:logout")}</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black1,
    padding: 15,
  },
  authenBox: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 70,
  },
  iconWrapper: {
    backgroundColor: colors.gray1,
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "600",
  },
  logout: {
    backgroundColor: colors.coconutCream,
    height: 40,
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  logoutText: {
    color: colors.text1,
    fontSize: 16,
    fontWeight: "500",
  },
  logoutWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Setting;
