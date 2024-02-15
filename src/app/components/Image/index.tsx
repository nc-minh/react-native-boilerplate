import React, {useEffect, useState} from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from "react-native";

interface CustomImageProps {
  imageUrl: string;
  style?: StyleProp<ImageStyle>;
  imageSource?: string;
}

function CustomImage(props: Readonly<CustomImageProps>): React.JSX.Element {
  const {imageUrl, style, imageSource} = props;

  const [source, setSource] = useState<ImageSourcePropType>(
    require("@/assets/images/broken-image.png"),
  );

  const handleImageError = () => {
    setSource(require("@/assets/images/broken-image.png"));
  };

  useEffect(() => {
    setSource({
      uri: imageUrl,
    });
  }, [imageUrl]);

  if (!imageSource) {
    return (
      <Image
        source={require("@/assets/images/broken-image.png")}
        style={[styles.image, style]}
      />
    );
  }

  return (
    <Image
      source={source}
      style={[styles.image, style]}
      defaultSource={require("@/assets/images/broken-image.png")}
      onError={handleImageError}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    height: 100,
    width: 100,
  },
  image: {
    height: 100,
    width: 100,
  },
  loadingIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomImage;
