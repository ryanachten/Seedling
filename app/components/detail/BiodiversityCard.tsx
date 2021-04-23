import React from "react";
import { View } from "react-native";
import { BiodiversityRecord } from "../../constants/Interfaces";
import { InfoItem } from "./InfoItem";

export const BiodiversityInfoCard = ({
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
      <InfoItem label="Genus" value={genus} />
      <InfoItem label="Scientific Name" value={scientificName} />
      <InfoItem label="Canonical Name" value={canonicalName} />
      <InfoItem label="Authorship" value={authorship} />
    </View>
  );
};
