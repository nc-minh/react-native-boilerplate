import FoodSearchList from "@/app/containers/FoodSearchList";
import useDebounce from "@/hooks/useDebounce";
import colors from "@/styles/colors";
import {useNavigation} from "@react-navigation/native";
import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

function Search(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [text, setText] = useState("");

  const handleTextOnChange = useCallback((tx: string) => {
    setText(tx);
  }, []);

  const handleRemoveTextInput = useCallback(() => {
    setText("");
  }, []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleTouchablePress = useCallback(() => Keyboard.dismiss(), []);

  const searchValue = useDebounce(text);

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <View style={styles.inputWrapper}>
          <Pressable onPress={handleBack}>
            <Ionicons name="arrow-back" color={colors.lightText} size={24} />
          </Pressable>

          <TextInput
            style={styles.input}
            placeholder={t("search:typingFoodName")}
            placeholderTextColor="#ccc"
            value={text}
            onChangeText={handleTextOnChange}
          />

          {!!text && (
            <Pressable onPress={handleRemoveTextInput}>
              <Feather style={styles.removeIcon} name="x-circle" size={24} />
            </Pressable>
          )}
        </View>
      </TouchableWithoutFeedback>

      <FoodSearchList q={searchValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#fff",
  },
  backIcon: {
    height: 30,
    width: 30,
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.black,
    padding: 10,
  },
  removeIcon: {height: 34, width: 34, color: colors.white},
  text: {
    color: "red",
  },
});

export default Search;
