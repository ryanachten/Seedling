import React, { useState } from "react";
import Carousel from "react-native-snap-carousel";
import {
  Image,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { BiodiversityRecordMedia } from "../constants/Interfaces";

interface Props {
  media: Array<BiodiversityRecordMedia>;
  styles?: StyleProp<ViewStyle>;
}

export const MediaGallery = ({ media, styles }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>();
  const [mediaToShow, setMediaToShow] = useState(media);

  if (!media || !media.length) {
    return <View />;
  }

  const { width } = useWindowDimensions();
  const itemWidth = width - 200;

  return (
    <View style={styles}>
      <Carousel
        layout={"default"}
        data={mediaToShow}
        sliderWidth={width}
        itemWidth={itemWidth}
        loop={true}
        renderItem={({
          item,
        }: {
          item: BiodiversityRecordMedia;
          index: number;
        }) => {
          return (
            <Image
              style={{
                height: 250,
                width: itemWidth,
              }}
              source={{
                uri: item.identifier,
              }}
              onError={() =>
                setMediaToShow(
                  [...mediaToShow].filter(
                    (m) => m.identifier !== item.identifier
                  )
                )
              }
            />
          );
        }}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
};
