import { configureStore } from "@reduxjs/toolkit";
import { plantReducer } from "./plant.reducer";

export const store = configureStore({
  reducer: {
    plants: plantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
