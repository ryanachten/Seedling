import { createReducer } from "@reduxjs/toolkit";
import actionCreatorFactory from "typescript-fsa";
import { Plant, SearchResult } from "../constants/Interfaces";
import { BaseState } from "./base";

const actionCreator = actionCreatorFactory();

export enum plantTypes {
  GET_PLANTS = "GET_PLANTS",
  SEARCH_PLANT = "SEARCH_PLANT",
}

export type PlantState = BaseState & {
  plants: Array<Plant>;
  searchResults: Array<SearchResult>;
};

export const initialPlantState: PlantState = {
  plants: [],
  searchResults: [],
  loading: false,
  error: null,
};

export const requestPlants = actionCreator.async<undefined, Array<Plant>>(
  plantTypes.GET_PLANTS
);
export const searchPlant = actionCreator.async<
  { term: string },
  Array<SearchResult>
>(plantTypes.SEARCH_PLANT);

export const plantReducer = createReducer(initialPlantState, (builder) => {
  // Request plants
  builder.addCase(requestPlants.started, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(requestPlants.done, (state, { payload }) => {
    state.plants = payload.result;
    state.loading = false;
  });
  builder.addCase(requestPlants.failed, (state, { payload }) => {
    const error = payload.error as Error;
    state.error = error.message;
    state.loading = false;
  });
  // Search plants
  builder.addCase(searchPlant.started, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(searchPlant.done, (state, { payload }) => {
    state.searchResults = payload.result;
    state.loading = false;
  });
  builder.addCase(searchPlant.failed, (state, { payload }) => {
    const error = payload.error as Error;
    state.error = error.message;
    state.loading = false;
  });
});
