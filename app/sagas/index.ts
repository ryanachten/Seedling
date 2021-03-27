import { all, put, takeEvery, takeLatest } from "redux-saga/effects";
import { plantTypes } from "../reducers/plant.reducer";
import { requestPlants } from "../reducers/plant.reducer";

export function* fetchPlants() {
  console.log("getPlants");
  //   yield put(receivedPlants([]));
}

export function* watchFetchPlants() {
  yield takeLatest(plantTypes.REQUEST_PLANTS, fetchPlants);
}

export function* rootSaga() {
  yield all([watchFetchPlants()]);
}
