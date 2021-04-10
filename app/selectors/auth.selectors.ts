import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export const isAuthLoading = createSelector(
  (state: RootState) => state.auth.loading,
  (state) => state
);

export const hasAuthError = createSelector(
  (state: RootState) => state.auth.error,
  (state) => state
);

export const getToken = createSelector(
  (state: RootState) => state.auth.token,
  (state) => state
);
