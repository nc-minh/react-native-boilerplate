import useGetAllFoods from "@/queries/food/useGetAllFoods";
import Food from "@/types/food/Food";
import React, {useCallback, useMemo} from "react";
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import FoodSearchItem from "./components/FoodSearchItem";

interface FoodSearchListProps {
  q: string;
}

function FoodSearchList(
  props: Readonly<FoodSearchListProps>,
): React.JSX.Element {
  const {q} = props;

  const {data, hasNextPage, isLoading, fetchNextPage} = useGetAllFoods({
    q,
  });

  const keyExtractor = (_: any, index: number) => index.toString();

  const foods = useMemo(() => {
    return data?.pages?.map(page => page.data).flat() as Food[];
  }, [data?.pages]);

  const handleOnReachEnd = useCallback(() => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isLoading]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={foods}
          keyExtractor={keyExtractor}
          renderItem={FoodSearchItem}
          onEndReached={handleOnReachEnd}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#000",
  },
});

export default FoodSearchList;
