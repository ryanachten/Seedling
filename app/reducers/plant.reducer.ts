import { createAction, createReducer } from "@reduxjs/toolkit";
import { Plant } from "../constants/Interfaces";
import { BaseState } from "./base";

export enum plantTypes {
  REQUEST_PLANTS = "REQUEST_PLANTS",
  REQUEST_PLANTS_SUCCESS = "REQUEST_PLANTS_SUCCESS",
  REQUEST_PLANTS_FAILED = "REQUEST_PLANTS_FAILED",
}

export type PlantState = BaseState & {
  plants: Array<Plant>;
};

export const initialPlantState: PlantState = {
  plants: [],
  loading: false,
  error: null,
};

export const requestPlants = createAction<undefined, plantTypes.REQUEST_PLANTS>(
  plantTypes.REQUEST_PLANTS
);

export const requestPlantsSuccess = createAction<
  Array<Plant>,
  plantTypes.REQUEST_PLANTS_SUCCESS
>(plantTypes.REQUEST_PLANTS_SUCCESS);

export const requestPlantsFailed = createAction<
  Error,
  plantTypes.REQUEST_PLANTS_FAILED
>(plantTypes.REQUEST_PLANTS_FAILED);

export const plantReducer = createReducer(initialPlantState, (builder) => {
  builder.addCase(requestPlants, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(requestPlantsSuccess, (state, action) => {
    state.plants = action.payload;
    state.loading = false;
  });
  builder.addCase(requestPlantsFailed, (state, action) => {
    state.error = action.payload.message;
    state.loading = false;
  });
});
