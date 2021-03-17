export type WateringPeriod = "days" | "weeks" | "months";

export interface Plant {
  id: number;
  userId: number;
  name: string;
  biodiversityResourceKey: number;
  lastWatered: Date;
  wateringFrequency: number;
  wateringPeriod: WateringPeriod;
}

export interface PlantForCreate {
  userId: number;
  name: string;
  biodiversityResourceKey: number;
  lastWatered: Date;
  wateringFrequency: number;
  wateringPeriod: WateringPeriod;
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
