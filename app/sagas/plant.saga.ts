import { call, put, takeLatest } from "redux-saga/effects";
import {
  createPlant,
  requestPlantById,
  requestPlants,
  searchPlant,
} from "../reducers/plant.reducer";
import * as Api from "../api/index";
import { Plant, SearchResult } from "../constants/Interfaces";

function* fetchPlants() {
  try {
    const plants: Array<Plant> = yield call(Api.fetchPlants);
    yield put(requestPlants.done({ result: plants }));
  } catch (error) {
    yield put(requestPlants.failed(error));
  }
}

function* fetchPlantById({
  payload: { id },
}: ReturnType<typeof requestPlantById.started>) {
  try {
    const plant: Plant = yield call(Api.fetchPlantById, id);
    yield put(requestPlantById.done({ params: { id }, result: plant }));
  } catch (error) {
    yield put(requestPlantById.failed(error));
  }
}

function* addPlant({
  payload: { plant: plantToCreate },
}: ReturnType<typeof createPlant.started>) {
  try {
    const plant: Plant = yield call(Api.createPlant, plantToCreate);
    yield put(
      createPlant.done({
        result: plant,
        params: {
          plant: plantToCreate,
        },
      })
    );
  } catch (error) {
    yield put(createPlant.failed(error));
  }
}

function* fetchPlantSearch({
  payload: { term },
}: ReturnType<typeof searchPlant.started>) {
  try {
    const searchResults: Array<SearchResult> = yield call(
      Api.searchPlants,
      term
    );
    yield put(
      searchPlant.done({
        result: searchResults,
        params: {
          term,
        },
      })
    );
  } catch (error) {
    yield put(searchPlant.failed(error));
  }
}

export function* watchPlants() {
  yield takeLatest(requestPlants.started, fetchPlants);
  yield takeLatest(requestPlantById.started, fetchPlantById);
  yield takeLatest(createPlant.started, addPlant);
  yield takeLatest(searchPlant.started, fetchPlantSearch);
}
