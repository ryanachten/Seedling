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
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Calendar, DotMarking } from "react-native-calendars";
import { Plant, WateringPeriod } from "../../constants/Interfaces";
import { Margin } from "../../constants/Sizes";
import { InfoItem } from "./InfoItem";

interface WateringScheduleCardProps {
  plant: Plant;
  style?: StyleProp<ViewStyle>;
}

type CalendarMarker = { [date: string]: DotMarking };

export const WateringScheduleCard = ({
  plant,
  style,
}: WateringScheduleCardProps) => {
  const { id, lastWatered, wateringFrequency, wateringPeriod } = plant;
  const [markedDates, setMarkedDates] = useState<CalendarMarker>({});
  const [wateringDates, setWateringDates] = useState<Array<Date>>([]);
  useEffect(() => {
    const { markers, dates } = getMarkedDates(plant);
    setMarkedDates(markers);
    setWateringDates(dates);
  }, [id]);

  const theme = useTheme();
  const primaryColor = theme["color-primary-default"];
  const nextWateringDate = wateringDates.length > 2 && wateringDates[1];

  return (
    <View style={style}>
      <View style={styles.infoWrapper}>
        <InfoItem
          style={styles.infoItem}
          label="Frequency"
          value={`${wateringFrequency} x ${WateringPeriod[wateringPeriod]}`}
        />
        {lastWatered && (
          <InfoItem
            style={styles.infoItem}
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
        {nextWateringDate && (
          <InfoItem
            label="Next watering date"
            value={`${formatDistance(
              new Date(nextWateringDate),
              new Date(Date.now()),
              {
                addSuffix: true,
              }
            )}`}
          />
        )}
      </View>
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

const getMarkedDates = ({
  lastWatered,
  wateringFrequency,
  wateringPeriod,
}: Plant): { dates: Array<Date>; markers: CalendarMarker } => {
  const dateMarkers: CalendarMarker = {};
  if (!lastWatered || !wateringFrequency || wateringPeriod === undefined) {
    return { markers: dateMarkers, dates: [] };
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
  return { markers: dateMarkers, dates };
};

const styles = StyleSheet.create({
  infoWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Margin.sm,
  },
  infoItem: {
    marginRight: Margin.md,
  },
});
