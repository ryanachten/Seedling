import { put, takeLatest } from "redux-saga/effects";
import { User } from "../constants/Interfaces";
import { restoreUser } from "../reducers/user.reducer";
import AsyncStorage from "@react-native-community/async-storage";
import { StorageKeys } from "../constants/StorageKeys";

function* restoreCachedUser() {
  try {
    const userState: string = yield AsyncStorage.getItem(StorageKeys.User);
    if (userState) {
      const user: User = JSON.parse(userState);
      yield put(restoreUser.done({ result: user }));
    } else {
      yield put(restoreUser.done({ result: null }));
    }
  } catch (error) {
    yield put(restoreUser.failed(error));
  }
}

export function* watchUser() {
  yield takeLatest(restoreUser.started, restoreCachedUser);
}
