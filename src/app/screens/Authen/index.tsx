import React, {useCallback, useState} from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {useTranslation} from "react-i18next";
import {useShallow} from "zustand/react/shallow";

import colors from "@/styles/colors";
import login from "@/services/auth/login";
import {storage} from "@/localStorage";
import {localStorageKey} from "@/constants/localStorage";
import useAppNavigation from "@/hooks/useAppNavigation";
import ERROR_CODE from "@/constants/error";
import register from "@/services/auth/register";
import {useAuthenStore} from "@/store/useAuthenStore";

function Authen(): React.JSX.Element {
  const navigation = useAppNavigation();
  const {t} = useTranslation();

  const [authen, setAuthen] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const {setUser, setAccessToken} = useAuthenStore(
    useShallow(state => ({
      setUser: state.setUser,
      setAccessToken: state.setAccessToken,
    })),
  );

  const handleSwitchAuthen = useCallback(() => {
    setError("");

    if (authen === "login") {
      return setAuthen("register");
    }

    return setAuthen("login");
  }, [authen]);

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleOnChangeUsername = useCallback((tx: string) => {
    setUsername(tx);
    setError("");
  }, []);

  const handleOnChangePassword = useCallback((tx: string) => {
    setPassword(tx);
    setError("");
  }, []);

  const handleOnChangeRePassword = useCallback((tx: string) => {
    setRePassword(tx);
    setError("");
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      Keyboard.dismiss();
      if (!username || !password) {
        return setError(t("authen:accountAndPasswordCannotBeLeftBlank"));
      }
      const data = await login({username, password});

      if (data?.data) {
        storage.set(localStorageKey.REFRESH_TOKEN, data?.data?.refreshToken);
        setAccessToken(data?.data?.accessToken);
        setUser(data?.data?.user);

        return navigation.navigate("HomeTab");
      }

      if (data?.errors.errorCode === ERROR_CODE.AUTHEN.USER_NOT_FOUND) {
        return setError(t("authen:userNotFound"));
      }
      if (data?.errors.errorCode === ERROR_CODE.AUTHEN.LOGIN_EXCEPTION) {
        return setError(t("authen:loginException"));
      }
    } catch (err) {
      return setError(t("authen:anUnknownError"));
    }
  }, [navigation, password, setAccessToken, setUser, t, username]);

  const handleTouchablePress = useCallback(() => Keyboard.dismiss(), []);

  const handleRegister = useCallback(async () => {
    try {
      Keyboard.dismiss();

      if (password !== repassword) {
        return setError(t("authen:reEnterIncorrectPassword"));
      }

      if (!username || !password) {
        return setError(t("authen:accountAndPasswordCannotBeLeftBlank"));
      }

      const data = await register({username, password});

      if (data?.data) {
        storage.set(localStorageKey.REFRESH_TOKEN, data?.data?.refreshToken);
        setAccessToken(data?.data?.accessToken);
        setUser(data?.data?.user);

        return navigation.navigate("HomeTab");
      }

      if (data?.errors.errorCode === ERROR_CODE.AUTHEN.DUPLICATE_USER) {
        return setError(t("authen:duplicateUser"));
      }
    } catch (err) {
      return setError(t("authen:anUnknownError"));
    }
  }, [navigation, password, repassword, setAccessToken, setUser, t, username]);

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View style={styles.container}>
        <View style={styles.exitWrapper}>
          <Pressable onPress={handleGoBack}>
            <Feather name="x-circle" color={colors.lightText} size={36} />
          </Pressable>
        </View>

        <View style={styles.titleWrapper}>
          {authen === "login" ? (
            <Text style={styles.title}>{t("authen:login")}</Text>
          ) : (
            <Text style={styles.title}>{t("authen:register")}</Text>
          )}
        </View>

        <View style={styles.errorMessageWrapper}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>

        {authen === "login" ? (
          <View>
            <View>
              <TextInput
                style={styles.input}
                placeholder={t("authen:username")}
                placeholderTextColor={colors.gray1}
                value={username}
                onChangeText={handleOnChangeUsername}
              />
              <TextInput
                style={styles.input}
                placeholder={t("authen:password")}
                placeholderTextColor={colors.gray1}
                secureTextEntry
                value={password}
                onChangeText={handleOnChangePassword}
              />

              <Pressable style={styles.btn} onPress={handleLogin}>
                <Text>{t("authen:login")}</Text>
              </Pressable>
            </View>
            <View style={styles.registerNavigate}>
              <Text>{t("authen:ifDonotHaveAccount")}</Text>
              <Pressable onPress={handleSwitchAuthen}>
                <Text style={styles.register}>{t("authen:register")}</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <TextInput
                style={styles.input}
                placeholder={t("authen:username")}
                placeholderTextColor={colors.gray1}
                value={username}
                onChangeText={handleOnChangeUsername}
              />
              <TextInput
                style={styles.input}
                placeholder={t("authen:password")}
                placeholderTextColor={colors.gray1}
                secureTextEntry
                value={password}
                onChangeText={handleOnChangePassword}
              />
              <TextInput
                style={styles.input}
                placeholder={t("authen:reEnterPassword")}
                placeholderTextColor={colors.gray1}
                secureTextEntry
                value={repassword}
                onChangeText={handleOnChangeRePassword}
              />

              <Pressable style={styles.btn} onPress={handleRegister}>
                <Text>{t("authen:register")}</Text>
              </Pressable>
            </View>
            <View style={styles.registerNavigate}>
              <Text>{t("authen:ifAlreadyHaveAccount")}</Text>
              <Pressable onPress={handleSwitchAuthen}>
                <Text style={styles.register}>{t("authen:login")}</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black1,
    padding: 15,
    height: "100%",
  },
  input: {
    backgroundColor: colors.lightText,
    color: colors.black,
    borderRadius: 12,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
  },
  btn: {
    borderRadius: 12,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.gray,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  registerNavigate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  register: {
    color: "red",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 20,
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  exitWrapper: {
    display: "flex",
    alignItems: "flex-end",
  },
  errorMessageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  errorMessage: {
    color: colors.red,
  },
});

export default Authen;
