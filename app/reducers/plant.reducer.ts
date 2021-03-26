import { createAction, createReducer } from "@reduxjs/toolkit";
import { Plant } from "../constants/Interfaces";
import { BaseState } from "./base";

export enum plantTypes {
  GET_PLANTS = "GET_PLANTS",
  SEARCH_PLANT = "SEARCH_PLANT",
  CREATE_PLANT = "CREATE_PLANT",
}

export type PlantState = BaseState & {
  plants: Array<Plant>;
};

export const initialPlantState: PlantState = {
  plants: [],
  loading: false,
  error: null,
};

const getPlants = createAction<Array<Plant>, plantTypes.GET_PLANTS>(
  plantTypes.GET_PLANTS
);

export const plantReducer = createReducer(initialPlantState, (builder) =>
  builder.addCase(getPlants, (state, action) => {
    state.plants = action.payload;
  })
);
