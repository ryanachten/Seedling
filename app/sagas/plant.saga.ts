import { call, put, takeLatest } from "redux-saga/effects";
import {
  plantTypes,
  requestPlantsFailed,
  requestPlantsSuccess,
} from "../reducers/plant.reducer";
import * as Api from "../api/index";
import { Plant } from "../constants/Interfaces";

export function* fetchPlants() {
  try {
    const plants: Array<Plant> = yield call(Api.fetchPlants);
    yield put(requestPlantsSuccess(plants));
  } catch (error) {
    yield put(requestPlantsFailed(error));
  }
}

export function* watchFetchPlants() {
  yield takeLatest(plantTypes.REQUEST_PLANTS, fetchPlants);
}
