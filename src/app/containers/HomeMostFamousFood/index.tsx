import React, {useMemo} from "react";
import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import HorizontalFoodList from "../HorizontalFoodList";
import useGetAllFoods from "@/queries/food/useGetAllFoods";
import Food from "@/types/food/Food";
import {useTranslation} from "react-i18next";
import colors from "@/styles/colors";

interface HomeMostFamousFoodProps {
  style?: StyleProp<ViewStyle>;
}
const HomeMostFamousFood = (props: Readonly<HomeMostFamousFoodProps>) => {
  const {style} = props;

  const {t} = useTranslation();

  const {data} = useGetAllFoods({sort: "view_count"});

  const foods = useMemo(() => {
    return data?.pages?.map(page => page.data).flat() as Food[];
  }, [data?.pages]);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{t("mostView")}</Text>

      <HorizontalFoodList foods={foods} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },
  container: {
    marginLeft: 6,
    marginRight: 6,
    padding: 6,
    backgroundColor: colors.black1,
    borderRadius: 12,
  },
});

export default HomeMostFamousFood;
