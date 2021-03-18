import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { BiodiversityRecordMedia } from "../constants/Interfaces";

interface Props {
  media: Array<BiodiversityRecordMedia>;
}

export const MediaGallery = ({ media }: Props) => {
  const [errorIndices, setErrorIndices] = useState<Array<number>>([]);

  if (!media || !media.length) {
    return <View />;
  }

  return (
    <View style={styles.imageWrapper}>
      {media.map((m, i) =>
        errorIndices.includes(i) ? (
          <View key={i} />
        ) : (
          <Image
            key={i}
            style={styles.imageThumb}
            source={{
              uri: m.identifier,
            }}
            onError={() => setErrorIndices([...errorIndices, i])}
          />
        )
      )}
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
    width: 100,
    height: 100,
  },
});
