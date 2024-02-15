import React from "react";
import {ScrollView, StyleSheet, Text} from "react-native";

import colors from "@/styles/colors";

function FoodLobby(): React.JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <Text>{"nau an thui"}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.coconutCream,
  },
  homeCategorySection: {
    marginBottom: 6,
  },
  homeMostFamousFood: {
    marginBottom: 6,
  },
});

export default FoodLobby;
