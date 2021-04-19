import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export const isPlantsLoading = createSelector(
  (state: RootState) => state.plants.loading,
  (state) => state
);

export const hasPlantError = createSelector(
  (state: RootState) => state.plants.error,
  (state) => state
);

export const getPlants = createSelector(
  (state: RootState) => state.plants.plants,
  (state) => state
);

export const getPlantById = (id: number) =>
  createSelector(
    (state: RootState) => state.plants.plants.find((p) => p.id === id),
    (state) => state
  );

export const getSearchResults = createSelector(
  (state: RootState) => state.plants.searchResults,
  (state) => state
);
