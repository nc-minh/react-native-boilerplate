import React, {useMemo, useState} from "react";
import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import Categories from "../Categories";
import HorizontalFoodList from "../HorizontalFoodList";
import useGetAllFoods from "@/queries/food/useGetAllFoods";
import Food from "@/types/food/Food";
import {useTranslation} from "react-i18next";
import colors from "@/styles/colors";

interface HomeCategorySectionProps {
  style?: StyleProp<ViewStyle>;
}
const HomeCategorySection = (props: Readonly<HomeCategorySectionProps>) => {
  const {style} = props;

  const {t} = useTranslation();
  const [categorySelected, setCategorySelected] = useState("");

  const {data} = useGetAllFoods({
    category_id: categorySelected,
  });

  const foods = useMemo(() => {
    return data?.pages?.map(page => page.data).flat() as Food[];
  }, [data?.pages]);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{t("whatsInYourFridge")}</Text>
      <Text style={styles.desc}>{t("pleaseChooseOne")}</Text>

      <Categories
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
        style={styles.category}
      />

      <HorizontalFoodList foods={foods} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  desc: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 15,
  },
  container: {
    marginLeft: 6,
    marginRight: 6,
    padding: 6,
    backgroundColor: colors.black1,
    borderRadius: 12,
  },
  category: {
    marginBottom: 15,
  },
});

export default HomeCategorySection;
