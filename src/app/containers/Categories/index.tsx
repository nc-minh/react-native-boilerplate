import CustomImage from "@/app/components/Image";
import {PREFIX_IMAGE_URL} from "@/constants/common";
import {useGetAllCategories} from "@/queries/category/useGetAllCategories";
import colors from "@/styles/colors";
import React, {useCallback} from "react";
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface CategoriesProps {
  categorySelected?: string;
  setCategorySelected?: (categoryId: string) => void;
  style?: StyleProp<ViewStyle>;
}
const Categories = (props: Readonly<CategoriesProps>) => {
  const {categorySelected, setCategorySelected = () => {}, style} = props;
  const {data: categories} = useGetAllCategories();

  const handlePressCategory = useCallback(
    (categoryId: string) => () => {
      setCategorySelected(categoryId);
    },
    [setCategorySelected],
  );

  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryWrapper}>
          {categories?.map(c => (
            <Pressable
              key={c._id}
              style={[
                styles.category,
                c._id === categorySelected && styles.categorySelected,
              ]}
              onPress={handlePressCategory(c._id)}>
              <View style={styles.imageWrapper}>
                <CustomImage
                  style={styles.image}
                  imageUrl={`${PREFIX_IMAGE_URL}${c?.image_url!}`}
                  imageSource={c?.image_url}
                />
              </View>

              <Text style={styles.categoryName}>{c?.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageWrapper: {
    backgroundColor: "#ddd",
    borderRadius: 12,
    width: "100%",
    height: 75,
    padding: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  category: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#00000000",
    width: 75,
  },
  categorySelected: {
    borderColor: "#f3a638",
    backgroundColor: "rgba(243,166,56, 0.4)",
  },
  categoryWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    gap: 10,
  },
  categoryName: {
    color: colors.text,
    fontSize: 16,
  },
});

export default Categories;
