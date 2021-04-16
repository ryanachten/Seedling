import { createReducer } from "@reduxjs/toolkit";
import actionCreatorFactory from "typescript-fsa";
import { User } from "../constants/Interfaces";
import { BaseState, handleError, handleLoading } from "./base.reducer";

const actionCreator = actionCreatorFactory();

enum userTypes {
  LOGIN_USER = "LOGIN_USER",
  RESTORE_USER = "RESTORE_USER",
}

export type UserState = BaseState & {
  user: User;
};

export const initialUserState: UserState = {
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    plants: [],
  },
  loading: false,
  error: null,
};

export const restoreUser = actionCreator.async<undefined, User | null>(
  userTypes.RESTORE_USER
);

export const loginUser = actionCreator<User>(userTypes.LOGIN_USER);

export const userReducer = createReducer(initialUserState, (builder) => {
  // Restore user
  builder.addCase(restoreUser.started, handleLoading);
  builder.addCase(restoreUser.done, (state, { payload }) => {
    if (payload.result !== null) {
      state.user = payload.result;
    }
    state.loading = false;
  });
  builder.addCase(restoreUser.failed, handleError);
  // Login user
  builder.addCase(loginUser, (state, { payload }) => {
    state.user = payload;
  });
});
