import Food from "@/types/food/Food";
import React, {useMemo} from "react";
import {Image, Pressable, ScrollView, StyleSheet, View} from "react-native";
import HorizontalFoodItem from "./components/HorizontalFoodItem";

interface HorizontalFoodListProps {
  foods?: Food[];
  onNext?: () => void;
}
const HorizontalFoodList = (props: Readonly<HorizontalFoodListProps>) => {
  const {foods, onNext = () => {}} = props;

  const shortList = useMemo(() => foods?.slice(0, 4), [foods]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.foods}>
          {shortList?.map(f => (
            <HorizontalFoodItem key={f._id} food={f} />
          ))}
        </View>

        <Pressable style={styles.more} onPress={onNext}>
          <Image
            style={styles.viewMoreIcon}
            source={require("@/assets/images/right-arrow.png")}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  datetime: {
    color: "#000",
  },
  foodName: {
    color: "#353a40",
    fontSize: 18,
  },
  foodItem: {
    backgroundColor: "#ddd",
    height: 250,
    width: 250,
    borderRadius: 12,
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },
  foods: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  avatar: {
    borderRadius: 24 / 2,
    height: 24,
    width: 24,
  },
  avatarWrapper: {
    borderRadius: 24 / 2,
    height: 24,
    width: 24,
    backgroundColor: "#ccc",
  },
  username: {
    color: "#fff",
    fontWeight: "600",
  },
  more: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginLeft: 10,
  },
  viewMoreIcon: {
    width: 64,
    height: 64,
  },
});

export default HorizontalFoodList;
