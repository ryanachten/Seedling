import { Button } from "@ui-kitten/components";
import React, { useState } from "react";
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { BiodiversityRecordMedia } from "../constants/Interfaces";
import { Icon } from "./Icon";

interface Props {
  media: Array<BiodiversityRecordMedia>;
  defaultImageCount?: number;
  styles?: StyleProp<ViewStyle>;
}

export const MediaGallery = ({
  defaultImageCount = 5,
  media,
  styles: customStyles,
}: Props) => {
  const [errorIndices, setErrorIndices] = useState<Array<number>>([]);
  const [showAllImages, setShowAllImages] = useState(false);

  if (!media || !media.length) {
    return <View />;
  }

  let mediaToShow = media.filter((el, i) => !errorIndices.includes(i));
  if (!showAllImages) {
    mediaToShow = mediaToShow.slice(0, defaultImageCount);
  }

  return (
    <View style={[styles.imageWrapper, customStyles]}>
      {mediaToShow.map((m, i) => (
        <Image
          key={i}
          style={styles.imageThumb}
          source={{
            uri: m.identifier,
          }}
          onError={() => setErrorIndices([...errorIndices, i])}
        />
      ))}
      <Button
        style={styles.imageThumb}
        appearance="ghost"
        status="primary"
        accessoryLeft={() => (
          <Icon
            size="sm"
            name={
              showAllImages ? "minus-circle-outline" : "plus-circle-outline"
            }
          />
        )}
        onPress={() => setShowAllImages(!showAllImages)}
      >
        {showAllImages ? "Show less" : "Show all"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageThumb: {
    width: "33.33%",
    height: 100,
  },
});
