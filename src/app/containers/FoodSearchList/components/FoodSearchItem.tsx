import React from "react";
import {StyleSheet, Text, View} from "react-native";

import CustomImage from "@/app/components/Image";
import {PREFIX_IMAGE_URL} from "@/constants/common";
import Food from "@/types/food/Food";
import User from "@/types/user/User";

const FoodSearchItem = ({item}: {item: Food}) => {
  const coverUrl = `${PREFIX_IMAGE_URL}${item?.cover_url!}`;
  const avatarUrl = `${PREFIX_IMAGE_URL}${(item.created_by as User)
    ?.avatar_url!}`;

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <View>
          <View style={styles.userWrapper}>
            <View style={styles.avatarWrapper}>
              <CustomImage
                style={styles.avatar}
                imageUrl={avatarUrl}
                imageSource={(item.created_by as User).avatar_url}
              />
            </View>
            <Text style={styles.name}>
              {(item.created_by as User)?.username}
            </Text>
          </View>

          <Text style={styles.name}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.imageWrapper}>
        <CustomImage
          style={styles.cover}
          imageUrl={coverUrl}
          imageSource={item?.cover_url}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //Item
  cover: {
    height: 100,
    width: 100,
  },
  name: {
    color: "#fff",
  },
  itemWrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  imageWrapper: {
    backgroundColor: "#ddd",
    borderRadius: 8,
    padding: 5,
  },
  avatar: {
    borderRadius: 24 / 2,
    height: 24,
    width: 24,
  },
  avatarWrapper: {
    backgroundColor: "#000",
    height: 24,
    width: 24,
    borderRadius: 24 / 2,
  },
  userWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default FoodSearchItem;
