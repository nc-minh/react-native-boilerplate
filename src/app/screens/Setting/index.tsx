import React from "react";
import {StyleSheet, Text, View} from "react-native";

import colors from "@/styles/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function Setting(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Setting</Text>
      <FontAwesome name="user-circle-o" color={colors.black} size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.coconutCream,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  text: {
    color: colors.black,
  },
});

export default Setting;
