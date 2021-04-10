// Corresponds with API enum
export type WateringPeriodOption = "days" | "weeks" | "months";
export type WateringPeriodValue = 0 | 1 | 2;

export interface Plant {
  id: number;
  userId: number;
  name: string;
  biodiversityResourceKey: number;
  lastWatered: Date;
  wateringFrequency: number;
  wateringPeriod: WateringPeriodValue;
}

export interface PlantForCreate {
  userId: number;
  name: string;
  biodiversityResourceKey: number;
  lastWatered: string;
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
