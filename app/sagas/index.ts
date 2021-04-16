import { all } from "redux-saga/effects";
import { watchAuth } from "./auth.saga";
import { watchPlants } from "./plant.saga";
import { watchUser } from "./user.saga";

export function* rootSaga() {
  yield all([watchAuth(), watchUser(), watchPlants()]);
}
