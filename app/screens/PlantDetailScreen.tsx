import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Spinner, Text } from "@ui-kitten/components";
import {
  Background,
  BiodiversityInfoCard,
  ErrorToast,
  MediaGallery,
  WateringScheduleCard,
} from "../components";
import { useScreenFocus } from "../hooks/useScreenFocus";
import { PlantParamList } from "../navigation/types";
import { PlantContext } from "../services/context";
import { Plant } from "../constants/Interfaces";
import { Margin } from "../constants/Sizes";

type Props = StackScreenProps<PlantParamList, "PlantDetailScreen">;

export const PlantDetailScreen = ({ route }: Props) => {
  const plantId = route.params.plantId;

  const {
    state: { plants, loading, error },
    actions: { getPlantById },
  } = useContext(PlantContext);

  useScreenFocus(() => {
    getPlantById(plantId);
  });

  const plant = plants.find((p) => p.id === plantId);
  return (
    <Background>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getPlantById(plantId)}
          />
        }
      >
        {loading ? <Spinner /> : plant && <PlantDetailCard plant={plant} />}
      </ScrollView>
      <ErrorToast error={error} />
    </Background>
  );
};

const PlantDetailCard = ({ plant }: { plant: Plant }) => {
  const { name, biodiversityRecord } = plant;

  return (
    <View>
      <Text category="h2" style={styles.title}>
        {name}
      </Text>
      {biodiversityRecord && (
        <MediaGallery
          media={biodiversityRecord.media}
          styles={styles.gallery}
        />
      )}

      <Text category="h5" style={styles.subtitle}>
        Watering Schedule
      </Text>
      <WateringScheduleCard style={styles.watering} plant={plant} />

      <Text category="h5" style={styles.subtitle}>
        Scientific Information
      </Text>
      <BiodiversityInfoCard biodiversityRecord={biodiversityRecord} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    marginBottom: Margin.sm,
  },
  title: {
    marginBottom: Margin.md,
  },
  subtitle: {
    marginBottom: Margin.sm,
    marginTop: Margin.sm,
  },
  gallery: {
    marginBottom: Margin.md,
  },
  watering: {
    marginBottom: Margin.md,
  },
});
