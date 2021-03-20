import { formatDistance } from "date-fns";
import React from "react";
import { View } from "react-native";
import { Plant, WateringPeriod } from "../../constants/Interfaces";
import { InfoItem } from "./InfoItem";

interface Props {
  plant: Plant;
}

export const WateringScheduleCard = ({ plant }: Props) => {
  return (
    <View>
      <InfoItem
        label="Frequency"
        value={`${plant.wateringFrequency} x ${
          WateringPeriod[plant.wateringPeriod]
        }`}
      />
      {plant.lastWatered && (
        <InfoItem
          label="Last watered"
          value={`${formatDistance(
            new Date(plant.lastWatered),
            new Date(Date.now()),
            {
              addSuffix: true,
            }
          )}`}
        />
      )}
    </View>
  );
};
