import { all } from "redux-saga/effects";
import { watchFetchPlants } from "./plant.saga";

export function* rootSaga() {
  yield all([watchFetchPlants()]);
}
