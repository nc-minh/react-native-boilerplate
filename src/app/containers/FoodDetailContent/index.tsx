import React from "react";
import {StyleSheet, Text, View} from "react-native";

import colors from "@/styles/colors";
import CustomImage from "@/app/components/Image";
import {PREFIX_IMAGE_URL} from "@/constants/common";
import {DateTime} from "luxon";
import User from "@/types/user/User";
import Food from "@/types/food/Food";
import {useTranslation} from "react-i18next";
import {useAuthenStore} from "@/store/useAuthenStore";
import {useShallow} from "zustand/react/shallow";

interface FoodDetailContentProps {
  food?: Food;
}
function FoodDetailContent(
  props: Readonly<FoodDetailContentProps>,
): React.JSX.Element {
  const {food} = props;

  const {t} = useTranslation();
  const {user} = useAuthenStore(
    useShallow(state => ({
      user: state.user,
    })),
  );

  return (
    <View style={styles.container}>
      <CustomImage
        style={styles.image}
        imageUrl={`${PREFIX_IMAGE_URL}${food?.cover_url}`}
        imageSource={food?.cover_url}
      />

      <View style={styles.contentWrapper}>
        <Text style={styles.foodName}>{food?.name}</Text>

        <View style={styles.authorWrapper}>
          <View style={styles.infoWrapper}>
            <View style={styles.avatarWrapper}>
              <CustomImage
                style={styles.avatar}
                imageUrl={`${PREFIX_IMAGE_URL}${
                  (food?.created_by as User)?.avatar_url
                }`}
                imageSource={(food?.created_by as User)?.avatar_url}
              />
            </View>

            <Text>{(food?.created_by as User)?.username}</Text>
          </View>

          <Text style={styles.datetime}>
            {DateTime.fromISO(food?.created_at!).toFormat(
              "hh:mm:ss - dd/MM/yyyy",
            )}
          </Text>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.datetime}>{food?.description}</Text>

          <View style={styles.savedFoodWrapper}>
            <Text style={styles.savedFoodText}>{t("food:savedFood")}</Text>
          </View>

          {user?._id === (food?.created_by as User)._id && (
            <View style={styles.editFoodWrapper}>
              <Text style={styles.editFoodText}>{t("food:editFood")}</Text>
            </View>
          )}
        </View>

        <View style={styles.ingredientWrapper}>
          <Text style={styles.ingredient}>{t("food:ingredient")}</Text>

          {food?.ingredient?.map(i => (
            <Text style={styles.ingredientItem} key={i}>
              {i}
            </Text>
          ))}
        </View>

        <View style={styles.cookingInstructions}>
          <Text style={styles.ingredient}>{t("food:cookingInstructions")}</Text>

          {food?.cooking_instructions?.map((c, index) => (
            <View style={styles.cookingInstructionsContent} key={c.description}>
              <View style={styles.sequenceNumberWrapper}>
                <Text style={styles.sequenceNumber}>{++index}</Text>
              </View>
              <View style={styles.instruction}>
                <Text style={styles.description}>{c.description}</Text>
                {!!c?.image_url && (
                  <CustomImage
                    style={styles.cookingInstructionsImage}
                    imageUrl={`${PREFIX_IMAGE_URL}${c?.image_url}`}
                    imageSource={c?.image_url}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black1,
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  contentWrapper: {
    padding: 15,
  },
  foodName: {
    fontSize: 20,
    textAlign: "center",
    color: colors.text,
  },
  datetime: {},
  avatar: {
    height: "100%",
    width: "100%",
  },
  avatarWrapper: {
    width: 36,
    height: 36,
    overflow: "hidden",
    borderRadius: 36 / 2,
    borderColor: colors.black,
    borderWidth: 1,
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  authorWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
  },
  ingredient: {
    fontSize: 18,
    color: colors.lightText,
  },
  ingredientWrapper: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  ingredientItem: {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomColor: colors.lightText,
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  descriptionWrapper: {
    borderBottomColor: colors.lightText,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  cookingInstructions: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  cookingInstructionsImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cookingInstructionsContent: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
  },
  sequenceNumberWrapper: {
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    borderRadius: 24 / 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sequenceNumber: {
    color: colors.text1,
  },
  description: {
    marginBottom: 20,
    marginRight: 10,
  },
  instruction: {
    marginRight: 10,
  },
  savedFoodWrapper: {
    backgroundColor: colors.crusta,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  savedFoodText: {
    color: colors.text1,
    fontSize: 16,
    fontWeight: "500",
  },
  editFoodWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.crusta,
  },
  editFoodText: {
    color: colors.crusta,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default FoodDetailContent;
