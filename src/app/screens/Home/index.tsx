import React from "react";
import {StyleSheet, Text, View} from "react-native";

import {API_ENDPOINT} from "@env";
import AntDesign from "react-native-vector-icons/AntDesign";

import colors from "@/styles/colors";

function Home(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.homeText}>HOME</Text>
      <AntDesign name="home" color={colors.black} size={24} />
      <Text style={styles.homeText}>ENV={API_ENDPOINT}</Text>
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
  homeText: {
    color: colors.black,
  },
});

export default Home;
