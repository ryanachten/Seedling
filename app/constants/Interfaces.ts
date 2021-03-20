// Corresponds with API enum
export type WateringPeriodOption = "days" | "weeks" | "months";
export type WateringPeriodValue = 0 | 1 | 2;
export const WateringPeriod: Record<
  WateringPeriodValue,
  WateringPeriodOption
> = {
  0: "days",
  1: "weeks",
  2: "months",
};

export interface BiodiversityRecordMedia {
  type: string; // TODO: probably actually an enum "StillImage"
  format: string;
  identifier: string;
}

export interface BiodiversityRecord {
  genus: string;
  scientificName: string;
  canonicalName: string;
  authorship: string;
  media: Array<BiodiversityRecordMedia>;
}

export interface Plant {
  id: number;
  userId: number;
  name: string;
  biodiversityResourceKey: number;
  lastWatered: Date;
  wateringFrequency: number;
  wateringPeriod: WateringPeriodValue;
  biodiversityRecord?: BiodiversityRecord;
}

export interface PlantForCreate {
  userId: number;
  name: string;
  biodiversityResourceKey: number;
  lastWatered: Date;
  wateringFrequency: number;
  wateringPeriod: WateringPeriodValue;
}

export interface SearchResult {
  key: number;
  scientificName: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  plants: Array<Plant>;
}
