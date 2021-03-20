import { useTheme } from "@ui-kitten/components";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  format,
  formatDistance,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar, DotMarking } from "react-native-calendars";
import { Plant, WateringPeriod } from "../../constants/Interfaces";
import { InfoItem } from "./InfoItem";

interface Props {
  plant: Plant;
}

type CalendarMarker = { [date: string]: DotMarking };

const getMarkedDates = ({
  lastWatered,
  wateringFrequency,
  wateringPeriod,
}: Plant): CalendarMarker => {
  const dateMarkers: CalendarMarker = {};
  if (!lastWatered || !wateringFrequency || wateringPeriod === undefined) {
    return dateMarkers;
  }
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
  const marker = { selected: true };
  dates.map((d) => (dateMarkers[format(d, "yyyy-MM-dd")] = marker));
  return dateMarkers;
};

export const WateringScheduleCard = ({ plant }: Props) => {
  const { id, lastWatered, wateringFrequency, wateringPeriod } = plant;
  const [markedDates, setMarkedDates] = useState<CalendarMarker>({});
  useEffect(() => {
    const markers = getMarkedDates(plant);
    setMarkedDates(markers);
  }, [id]);

  const theme = useTheme();
  const primaryColor = theme["color-primary-default"];

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
      <Calendar
        markedDates={markedDates}
        theme={{
          arrowColor: primaryColor,
          selectedDayBackgroundColor: primaryColor,
        }}
      />
    </View>
  );
};
