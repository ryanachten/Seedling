import { all } from "redux-saga/effects";
import { watchPlants } from "./plant.saga";
import { watchUser } from "./user.saga";

export function* rootSaga() {
  yield all([watchPlants(), watchUser()]);
}
