import React from "react";
import {ScrollView, StyleSheet} from "react-native";

import Header from "@/app/components/Header";
import HomeCategorySection from "@/app/containers/HomeCategorySection";
import colors from "@/styles/colors";
import HomeMostFamousFood from "@/app/containers/HomeMostFamousFood";

function Home(): React.JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <Header />

      <HomeCategorySection style={styles.homeCategorySection} />

      <HomeMostFamousFood style={styles.homeMostFamousFood} />

      <HomeMostFamousFood style={styles.homeMostFamousFood} />
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

export default Home;
