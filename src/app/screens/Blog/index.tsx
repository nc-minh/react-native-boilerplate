import React from "react";
import {Button, ScrollView, View} from "react-native";

import useAppNavigation from "@/hooks/useAppNavigation";
import useGetAllFoods from "@/queries/food/useGetAllFoods";

function Blog(): React.JSX.Element {
  const navigation = useAppNavigation();

  const {data} = useGetAllFoods({});

  console.log("data", data);

  return (
    <ScrollView>
      <View>
        {/* {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
        {data?.map((blog: any) => (
          <Text key={blog?.id} style={styles.highlight}>
            BLOG + {blog?.title}
          </Text>
        ))} */}

        <Button title="Blog" onPress={() => navigation.navigate("Home")} />
      </View>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   highlight: {
//     color: "red",
//   },
//   loading: {
//     height: "100%",
//   },
// });

export default Blog;
