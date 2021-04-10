import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";
import { plantReducer } from "./plant.reducer";
import { userReducer } from "./user.reducer";

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    plants: plantReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);

export const action = (type: string) => store.dispatch({ type });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
