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
      <Text category="h2" style={styles.title}>
        {name}
      </Text>
      {biodiversityRecord && (
        <MediaGallery
          media={biodiversityRecord.media}
          styles={styles.gallery}
        />
      )}
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

  const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoItem}>
      <Text category="label">{label}</Text>
      <Text>{value}</Text>
    </View>
  );

  return (
    <View>
      <InfoItem label="Genus" value={genus} />
      <InfoItem label="Scientific Name" value={scientificName} />
      <InfoItem label="Canonical Name" value={canonicalName} />
      <InfoItem label="Authorship" value={authorship} />
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
  gallery: {
    marginBottom: Margin.md,
  },
});
