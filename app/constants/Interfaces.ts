export type WateringPeriod = "daily" | "weekly" | "monthly";

export interface Plant {
  id: number;
  name: string;
  biodiversityResourceKey: number;
  userId: number;
  lastWatered: Date;
  wateringFrequency: number;
  wateringPeriod: WateringPeriod;
}

export interface PlantForCreate {
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
