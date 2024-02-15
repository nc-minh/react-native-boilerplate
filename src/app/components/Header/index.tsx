import useAppNavigation from "@/hooks/useAppNavigation";
import React, {useCallback} from "react";
import {useTranslation} from "react-i18next";
import {Image, Pressable, StyleSheet, TextInput, View} from "react-native";
function Header(): React.JSX.Element {
  const navigation = useAppNavigation();
  const {t} = useTranslation();

  const onPressHandler = useCallback(() => {
    navigation.navigate("SearchTab");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/chef.png")}
      />

      <View style={styles.searchWrapper}>
        <Image
          style={styles.searchIcon}
          source={require("@/assets/images/search.png")}
        />
        <Pressable onPress={onPressHandler}>
          <TextInput
            style={styles.input}
            placeholder={t("search:typingFoodName")}
            placeholderTextColor="#ccc"
            editable={false}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 46,
    height: 46,
  },
  searchIcon: {
    width: 36,
    height: 36,
  },
  searchWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    paddingBottom: 2,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  input: {
    color: "#000",
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Header;
