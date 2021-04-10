import { createReducer } from "@reduxjs/toolkit";
import actionCreatorFactory, { Action, Failure } from "typescript-fsa";
import { Plant, PlantForCreate, SearchResult } from "../constants/Interfaces";
import { BaseState } from "./base";

const actionCreator = actionCreatorFactory();

enum plantTypes {
  GET_PLANTS = "GET_PLANTS",
  SEARCH_PLANT = "SEARCH_PLANT",
  CREATE_PLANT = "CREATE_PLANT",
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

export const createPlant = actionCreator.async<
  { plant: PlantForCreate },
  Plant
>(plantTypes.CREATE_PLANT);

export const searchPlant = actionCreator.async<
  { term: string },
  Array<SearchResult>
>(plantTypes.SEARCH_PLANT);

const handleLoading = (state: PlantState) => {
  state.loading = true;
  state.error = null;
};

const handleError = (
  state: PlantState,
  { payload }: Action<Failure<any, {}>>
) => {
  state.error = `${payload}`;
  state.loading = false;
};

export const plantReducer = createReducer(initialPlantState, (builder) => {
  // Request plants
  builder.addCase(requestPlants.started, handleLoading);
  builder.addCase(requestPlants.done, (state, { payload }) => {
    state.plants = payload.result;
    state.loading = false;
  });
  builder.addCase(requestPlants.failed, handleError);
  // Create plant
  builder.addCase(createPlant.started, handleLoading);
  builder.addCase(createPlant.done, (state, { payload }) => {
    state.plants = [...state.plants, payload.result];
    state.loading = false;
  });
  builder.addCase(createPlant.failed, handleError);
  // Search plants
  builder.addCase(searchPlant.started, handleLoading);
  builder.addCase(searchPlant.done, (state, { payload }) => {
    state.searchResults = payload.result;
    state.loading = false;
  });
  builder.addCase(searchPlant.failed, handleError);
});
