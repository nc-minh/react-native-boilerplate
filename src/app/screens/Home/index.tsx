import React from "react";
import {StyleSheet, Text, View} from "react-native";

import {API_ENDPOINT} from "@env";

import colors from "@/styles/colors";

function Home(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.homeText}>HOME</Text>
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
