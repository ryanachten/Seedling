import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "@ui-kitten/components";
import { Background, ErrorToast, MediaGallery } from "../components";
import { useScreenFocus } from "../hooks/useScreenFocus";
import { PlantParamList } from "../navigation/types";
import { PlantContext } from "../services/context";
import { BiodiversityRecord, Plant } from "../constants/Interfaces";

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
        {plant && <PlantDetailCard plant={plant} />}
      </ScrollView>
      <ErrorToast error={error} />
    </Background>
  );
};

const PlantDetailCard = ({ plant }: { plant: Plant }) => {
  const { name, biodiversityRecord } = plant;

  return (
    <View>
      {biodiversityRecord && <MediaGallery media={biodiversityRecord.media} />}
      <Text>{name}</Text>
      <BiodiversityInfoCard biodiversityRecord={biodiversityRecord} />
    </View>
  );
};

const BiodiversityInfoCard = ({
  biodiversityRecord,
}: {
  biodiversityRecord?: BiodiversityRecord;
}) => {
  if (!biodiversityRecord) {
    return <View />;
  }
  const {
    genus,
    scientificName,
    canonicalName,
    authorship,
  } = biodiversityRecord;

  return (
    <View>
      <Text>{genus}</Text>
      <Text>{scientificName}</Text>
      <Text>{canonicalName}</Text>
      <Text>{authorship}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
