import { createReducer } from "@reduxjs/toolkit";
import actionCreatorFactory from "typescript-fsa";
import { UserForRegister } from "../constants/Interfaces";
import { BaseState, handleError, handleLoading } from "./base";

const actionCreator = actionCreatorFactory();

enum authTypes {
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
export const initialAuthState: AuthState = {
  loading: false,
  signedOut: false,
  token: null,
  error: null,
};

export const restoreToken = actionCreator.async<undefined, string | null>(
  authTypes.RESTORE_TOKEN
);

export const signIn = actionCreator.async<
  { email: string; password: string },
  string
>(authTypes.SIGN_IN);

export const signUp = actionCreator.async<UserForRegister, undefined>(
  authTypes.SIGN_UP
);

export const signOut = actionCreator.async<undefined, undefined>(
  authTypes.SIGN_OUT
);

export const authReducer = createReducer(initialAuthState, (builder) => {
  // Restore token
  builder.addCase(restoreToken.started, handleLoading);
  builder.addCase(restoreToken.done, (state, { payload }) => {
    if (payload.result !== null) {
      state.token = payload.result;
    }
    state.loading = false;
  });
  builder.addCase(restoreToken.failed, handleError);
  // Sign in
  builder.addCase(signIn.started, handleLoading);
  builder.addCase(signIn.done, (state, { payload }) => {
    state.token = payload.result;
    state.loading = false;
  });
  builder.addCase(signIn.failed, handleError);
  // Sign out
  builder.addCase(signOut.started, handleLoading);
  builder.addCase(signOut.done, (state) => {
    state.token = null;
    state.loading = false;
  });
  builder.addCase(signOut.failed, handleError);
});
