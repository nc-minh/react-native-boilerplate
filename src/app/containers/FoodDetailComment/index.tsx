import React, {useCallback, useState} from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {useTranslation} from "react-i18next";
import {useShallow} from "zustand/react/shallow";

import colors from "@/styles/colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import {
  GET_ALL_COMMENTS_OF_FOOD_QUERY_KEY,
  useGetAllCommentsOfFood,
} from "@/queries/comment/useGetAllCommentsOfFood";
import CustomImage from "@/app/components/Image";
import {PREFIX_IMAGE_URL} from "@/constants/common";
import createNewFoodComment from "@/services/comment/createNewFoodComment";
import {useAuthenStore} from "@/store/useAuthenStore";
import queryClient from "@/queries";

interface FoodDetailCommentProps {
  food_id?: string;
}
function FoodDetailComment(
  props: Readonly<FoodDetailCommentProps>,
): React.JSX.Element {
  const {food_id} = props;

  const {t} = useTranslation();

  const {accessToken, user} = useAuthenStore(
    useShallow(state => ({
      accessToken: state.accessToken,
      user: state.user,
    })),
  );

  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const {data} = useGetAllCommentsOfFood({foods_id: food_id});

  const handleOnChangeNewComment = useCallback((tx: string) => {
    setNewComment(tx);
  }, []);

  const handleComment = useCallback(async () => {
    try {
      setLoading(true);
      await createNewFoodComment({
        foods_id: food_id!,
        content: newComment,
      });

      setLoading(false);
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_COMMENTS_OF_FOOD_QUERY_KEY],
      });
      setNewComment("");
    } catch (error: any) {
      setLoading(false);
      ToastAndroid.show(t("somethingWentWrong"), ToastAndroid.SHORT);
    }
  }, [newComment, food_id, t]);

  const handleTouchablePress = useCallback(() => Keyboard.dismiss(), []);

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <View style={styles.container}>
          <View style={styles.header}>
            <FontAwesome5
              name="comment-alt"
              color={colors.lightText}
              size={24}
            />

            <Text>{t("comment:comment")}</Text>

            <Text>{data?.length ?? 0}</Text>
          </View>

          {accessToken ? (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={newComment}
                placeholder={t("comment:addComment")}
                onChangeText={handleOnChangeNewComment}
              />

              {!!newComment && (
                <Pressable onPress={handleComment} style={styles.pushComment}>
                  <Ionicons
                    name="send-outline"
                    color={colors.lightText}
                    size={24}
                  />
                </Pressable>
              )}
            </View>
          ) : (
            <View style={styles.inputWrapper}>
              <Text>{t("comment:loginToComment")}</Text>
            </View>
          )}

          {loading && (
            <ActivityIndicator size="large" color={colors.coconutCream} />
          )}

          <View>
            {data?.map(c => (
              <View key={c._id} style={styles.commentItem}>
                <View style={styles.avatarCommentWrapper}>
                  <CustomImage
                    style={styles.avatar}
                    imageUrl={`${PREFIX_IMAGE_URL}${c.created_by.avatar_url}`}
                    imageSource={c.created_by.avatar_url}
                  />
                </View>

                <View style={styles.commentMain}>
                  <Text style={styles.username}>{c.created_by.username}</Text>
                  <Text style={styles.commentContent}>{c.content}</Text>
                </View>

                {user?._id === c.created_by._id && (
                  <Pressable>
                    <Feather
                      name="more-vertical"
                      color={colors.lightText}
                      size={24}
                    />
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black1,
    padding: 15,
    borderTopColor: colors.coconutCream,
    borderTopWidth: 1,
    height: "100%",
    paddingBottom: 50,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
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
  username: {
    color: colors.lightText,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.coconutCream,
    borderRadius: 24,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 54,
    marginBottom: 10,
  },
  input: {
    flex: 1,
  },
  pushComment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  avatarCommentWrapper: {
    width: 24,
    height: 24,
    borderColor: colors.coconutCream,
    borderWidth: 1,
    borderRadius: 24 / 2,
    overflow: "hidden",
  },
  commentItem: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderBottomColor: colors.coconutCream,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    borderStyle: "dashed",
  },
  commentContent: {
    marginRight: 10,
  },
  commentMain: {
    marginRight: 10,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});

export default FoodDetailComment;
