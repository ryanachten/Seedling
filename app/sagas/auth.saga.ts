import { call, put, takeLatest } from "redux-saga/effects";
import AsyncStorage from "@react-native-community/async-storage";
import { StorageKeys } from "../constants/StorageKeys";
import {
  restoreToken,
  signIn,
  signOut,
  signUp,
} from "../reducers/auth.reducer";
import * as Api from "../api/index";
import { LoginResponse } from "../api/index";
import { loginUser } from "../reducers/user.reducer";
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

function* signInUser({
  payload: { email, password },
}: ReturnType<typeof signIn.started>) {
  try {
    const params = { email, password };
    const { user, token }: LoginResponse = yield call(Api.postLogin, params);
    axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
    yield AsyncStorage.setItem(StorageKeys.Token, token);
    yield put(signIn.done({ params, result: token }));
    yield put(loginUser(user));
  } catch (error) {
    yield put(signIn.failed(error));
  }
}

function* signUpUser({
  payload: userForRegister,
}: ReturnType<typeof signUp.started>) {
  try {
    yield call(Api.postRegistration, userForRegister);
    yield put(signUp.done({ params: userForRegister }));
  } catch (error) {
    yield put(signUp.failed(error));
  }
}

function* signOutUser() {
  try {
    yield AsyncStorage.multiRemove([StorageKeys.Token, StorageKeys.User]);
    yield put(signOut.done({}));
  } catch (error) {
    yield put(signOut.failed(error));
  }
}

export function* watchAuth() {
  yield takeLatest(restoreToken.started, restoreCachedToken);
  yield takeLatest(signIn.started, signInUser);
  yield takeLatest(signOut.started, signOutUser);
  yield takeLatest(signUp.started, signUpUser);
}
