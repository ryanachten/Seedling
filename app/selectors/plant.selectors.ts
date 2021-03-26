import { createSelector } from "reselect";
import { RootState } from "../reducers";

export const selectPlants = createSelector(
  (state: RootState) => state.plants,
  (plants) => plants
);
