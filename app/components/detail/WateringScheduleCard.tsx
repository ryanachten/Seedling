import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  format,
  formatDistance,
} from "date-fns";
import React from "react";
import { View } from "react-native";
import { Calendar, DotMarking } from "react-native-calendars";
import { Plant, WateringPeriod } from "../../constants/Interfaces";
import { InfoItem } from "./InfoItem";

interface Props {
  plant: Plant;
}

type CalendarMarker = { [date: string]: DotMarking };

export const WateringScheduleCard = ({ plant }: Props) => {
  const { lastWatered, wateringFrequency, wateringPeriod } = plant;
  const markedDates = (): CalendarMarker => {
    const dates = [new Date(lastWatered)];
    let index = 0;
    // Provide all watering dates for one year
    while (dates[dates.length - 1] < addYears(Date.now(), 1)) {
      switch (wateringPeriod) {
        // Weeks
        case 1:
          dates.push(addWeeks(dates[index], wateringFrequency));
          break;
        // Months
        case 1:
          dates.push(addMonths(dates[index], wateringFrequency));
          break;
        // Days
        case 0:
        default:
          dates.push(addDays(dates[index], wateringFrequency));
      }
      index++;
    }
    const dateMarkers: CalendarMarker = {};
    const marker = { selected: true };
    dates.map((d) => (dateMarkers[format(d, "yyyy-MM-dd")] = marker));
    return dateMarkers;
  };
  return (
    <View>
      <InfoItem
        label="Frequency"
        value={`${wateringFrequency} x ${WateringPeriod[wateringPeriod]}`}
      />
      {lastWatered && (
        <InfoItem
          label="Last watered"
          value={`${formatDistance(
            new Date(lastWatered),
            new Date(Date.now()),
            {
              addSuffix: true,
            }
          )}`}
        />
      )}
      <Calendar markedDates={markedDates()} />
    </View>
  );
};
