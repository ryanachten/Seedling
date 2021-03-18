import { Button, Modal } from "@ui-kitten/components";
import React, { useState } from "react";
import Lightbox from "react-native-image-gallery";
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "@ui-kitten/components";
import { BiodiversityRecordMedia } from "../constants/Interfaces";
import { Icon } from "./Icon";
import { ModalBackground } from "../constants/Colors";
import { Margin } from "../constants/Sizes";

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
  const [showLightbox, setShowLightbox] = useState(false);

  if (!media || !media.length) {
    return <View />;
  }

  let mediaToShow = media.filter((el, i) => !errorIndices.includes(i));
  if (!showAllImages && !showLightbox) {
    mediaToShow = mediaToShow.slice(0, defaultImageCount);
  }

  return (
    <View style={[styles.imageWrapper, customStyles]}>
      {mediaToShow.map((m, i) => (
        <TouchableOpacity
          style={styles.imageThumbWrapper}
          key={i}
          onPress={() => setShowLightbox(true)}
        >
          <Image
            style={styles.imageThumb}
            source={{
              uri: m.identifier,
            }}
            onError={() => setErrorIndices([...errorIndices, i])}
          />
        </TouchableOpacity>
      ))}
      <Button
        style={styles.imageThumbWrapper}
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
      <Modal visible={showLightbox}>
        <Button
          onPress={() => setShowLightbox(false)}
          style={styles.lightboxCloseButton}
          accessoryLeft={() => (
            <Icon fill="white" size="sm" name="close-circle-outline" />
          )}
        >
          Close
        </Button>
        <Lightbox
          style={styles.backdrop}
          images={mediaToShow.map((m) => ({
            source: {
              uri: m.identifier,
            },
          }))}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: ModalBackground,
  },
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageThumbWrapper: {
    minWidth: "33.33%",
    minHeight: 100,
  },
  imageThumb: {
    width: "100%",
    height: 100,
  },
  lightboxCloseButton: {
    marginTop: 100,
    position: "absolute",
    right: Margin.md,
    zIndex: 1,
  },
});
