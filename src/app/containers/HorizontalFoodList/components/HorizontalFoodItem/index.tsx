import CustomImage from "@/app/components/Image";
import {PREFIX_IMAGE_URL} from "@/constants/common";
import useAppNavigation from "@/hooks/useAppNavigation";
import Food from "@/types/food/Food";
import User from "@/types/user/User";
import {DateTime} from "luxon";
import React, {useCallback} from "react";
import {ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";

interface HorizontalFoodItemProps {
  food: Food;
}
const HorizontalFoodItem = (props: Readonly<HorizontalFoodItemProps>) => {
  const {food} = props;

  const navigation = useAppNavigation();

  const handleGoToFoodDetail = useCallback(() => {
    if (food?._id) {
      navigation.navigate("FoodDetail", {
        id: food._id,
      });
    }
  }, [food._id, navigation]);

  return (
    <Pressable style={styles.container} onPress={handleGoToFoodDetail}>
      <ImageBackground
        key={food?._id}
        source={{uri: `${PREFIX_IMAGE_URL}${food?.cover_url!}`}}
        resizeMode="cover"
        style={styles.foodItem}>
        <Text style={styles.datetime}>
          {DateTime.fromISO(food?.created_at).toFormat("dd/MM/yyyy")}
        </Text>
        <View style={styles.overlay} />
        <View>
          <View style={styles.userInfo}>
            <View style={styles.avatarWrapper}>
              <CustomImage
                style={styles.avatar}
                imageUrl={`${PREFIX_IMAGE_URL}${
                  (food?.created_by as User).avatar_url
                }`}
                imageSource={(food?.created_by as User).avatar_url}
              />
            </View>
            <Text style={styles.username}>
              {(food?.created_by as User).username}
            </Text>
          </View>
          <Text style={styles.foodName}>{food?.name}</Text>
        </View>
      </ImageBackground>
    </Pressable>
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
    overflow: "hidden",
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
  overlay: {},
});

export default HorizontalFoodItem;
