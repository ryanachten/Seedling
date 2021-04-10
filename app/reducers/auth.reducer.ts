import { createReducer } from "@reduxjs/toolkit";
import actionCreatorFactory from "typescript-fsa";
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
  loading: true,
  signedOut: false,
  token: null,
  error: null,
};

export const restoreToken = actionCreator.async<undefined, string | null>(
  authTypes.RESTORE_TOKEN
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
});
