import axios, { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { User } from "../constants/Interfaces";
import { LOGIN_URL, REGISTER_URL } from "../constants/Api";
import { UserAction, userTypes } from "./user";
import { StorageKeys } from "../constants/StorageKeys";
import { BaseState, baseTypes, BaseActions } from "./base";
import Axios from "axios";

export enum authTypes {
  RESTORE_TOKEN = "RESTORE_TOKEN",
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
  SIGN_OUT = "SIGN_OUT",
}

type Token = string | null;

export type AuthState = BaseState & {
  signedOut: boolean;
  token: Token;
};

export type AuthAction =
  | BaseActions
  | { type: authTypes.SIGN_UP }
  | { type: authTypes.SIGN_OUT }
  | { type: authTypes.SIGN_IN; token: Token }
  | { type: authTypes.RESTORE_TOKEN; token: Token };

export type AuthActions = {
  restoreToken: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (user: UserForRegister) => Promise<void>;
};

export const initialAuthState: AuthState = {
  loading: true,
  signedOut: false,
  token: null,
  error: null,
};

type UserForRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const authActions = (
  dispatch: React.Dispatch<AuthAction>,
  userDispatch: React.Dispatch<UserAction>
): AuthActions => ({
  restoreToken: async () => {
    let token = null;
    try {
      // TODO: After restoring token, we may need to validate it in production apps
      token = await AsyncStorage.getItem(StorageKeys.Token);
      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
      dispatch({ type: authTypes.RESTORE_TOKEN, token });
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
  signIn: async (email, password) => {
    dispatch({ type: baseTypes.LOADING });
    try {
      const {
        data,
      }: AxiosResponse<{
        token: string;
        user: User;
      }> = await Axios.post(LOGIN_URL, {
        email,
        password,
      });
      const { token, user } = data;

      // Dispatch and serialise token
      await AsyncStorage.setItem(StorageKeys.Token, token);
      axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
      dispatch({ type: authTypes.SIGN_IN, token });

      // Dispatch and serialise user
      await AsyncStorage.setItem(StorageKeys.User, JSON.stringify(user));
      userDispatch({ type: userTypes.LOGIN_USER, user });
    } catch (error) {
      dispatch({ type: baseTypes.ERROR, error: error.message });
    }
  },
  signOut: () => {
    AsyncStorage.multiRemove([StorageKeys.Token, StorageKeys.User]);
    dispatch({ type: authTypes.SIGN_OUT });
  },
  signUp: async ({ firstName, lastName, email, password }: UserForRegister) => {
    dispatch({ type: baseTypes.LOADING });
    try {
      await Axios.post(REGISTER_URL, {
        firstName,
        lastName,
        email,
        password,
      });
      dispatch({ type: authTypes.SIGN_UP });
    } catch (error) {
      dispatch({ type: baseTypes.ERROR, error: error.message });
    }
  },
});

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case authTypes.RESTORE_TOKEN:
      return {
        ...state,
        token: action.token,
        loading: false,
        error: null,
      };
    case authTypes.SIGN_IN:
      return {
        ...state,
        signedOut: false,
        loading: false,
        token: action.token,
        error: null,
      };
    case authTypes.SIGN_UP:
      return {
        ...state,
        signedOut: true,
        loading: false,
        token: null,
        error: null,
      };
    case authTypes.SIGN_OUT:
      return {
        ...state,
        signedOut: true,
        loading: false,
        error: null,
        token: null,
      };
    case baseTypes.ERROR:
      return {
        ...state,
        signedOut: true,
        loading: false,
        error: action.error,
        token: null,
      };
    case baseTypes.LOADING:
      return {
        ...state,
        signedOut: true,
        loading: true,
        error: null,
        token: null,
      };
    default:
      return state;
  }
};
