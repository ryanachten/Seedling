import React, { createContext, useMemo, useReducer } from "react";
import {
  authActions,
  AuthActions,
  authReducer,
  AuthState,
  initialAuthState,
} from "../reducers/auth";
import { initialUserState, userReducer } from "../reducers/user";

export const AuthContext = createContext<{
  state: Partial<AuthState>;
  actions: AuthActions;
}>({});

export const CombinedContext = ({ children }: { children: JSX.Element }) => {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);
  const [auth, authDispatch] = useReducer(authReducer, initialAuthState);
  const authContext = useMemo(
    () => authActions(authDispatch, userDispatch),
    []
  );
  return (
    <AuthContext.Provider value={{ state: auth, actions: authContext }}>
      {children}
    </AuthContext.Provider>
  );
};
