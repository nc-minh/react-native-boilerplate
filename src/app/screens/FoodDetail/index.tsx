import React from "react";
import {ScrollView, StyleSheet} from "react-native";

import colors from "@/styles/colors";
import {useGetFoodById} from "@/queries/food/useGetFoodById";
import useAppRoute from "@/hooks/useAppRoute";
import FoodDetailContent from "@/app/containers/FoodDetailContent";
import FoodDetailComment from "@/app/containers/FoodDetailComment";

function FoodDetail(): React.JSX.Element {
  const route = useAppRoute();

  const {data: food} = useGetFoodById({id: route.params?.id});

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always">
      <FoodDetailContent food={food} />

      <FoodDetailComment food_id={food?._id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black1,
  },
});

export default FoodDetail;
