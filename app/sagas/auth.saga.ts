import { put, takeLatest } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
import { StorageKeys } from "../constants/StorageKeys";
import { restoreToken } from "../reducers/auth.reducer";
import axios from "axios";

function* restoreCachedToken() {
  try {
    const token: string = yield AsyncStorage.getItem(StorageKeys.Token);
    if (token) {
      // TODO: After restoring token, we may need to validate it in production apps
      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
      yield put(restoreToken.done({ result: token }));
    } else {
      yield put(restoreToken.done({ result: null }));
    }
  } catch (error) {
    yield put(restoreToken.failed(error));
  }
}

export function* watchAuth() {
  yield takeLatest(restoreToken.started, restoreCachedToken);
}
