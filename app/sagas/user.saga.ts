import { put, takeLatest } from "redux-saga/effects";
import { User } from "../constants/Interfaces";
import { loginUser, restoreUser } from "../reducers/user.reducer";
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

function* cacheUser({ payload }: ReturnType<typeof loginUser>) {
  const serlializedUser = JSON.stringify(payload);
  yield AsyncStorage.setItem(StorageKeys.User, serlializedUser);
}

export function* watchUser() {
  yield takeLatest(restoreUser.started, restoreCachedUser);
  yield takeLatest(loginUser, cacheUser);
}
