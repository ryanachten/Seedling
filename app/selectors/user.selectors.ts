import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export const isUserLoading = createSelector(
  (state: RootState) => state.user.loading,
  (state) => state
);

export const hasUserError = createSelector(
  (state: RootState) => state.user.error,
  (state) => state
);

export const getUser = createSelector(
  (state: RootState) => state.user.user,
  (state) => state
);
