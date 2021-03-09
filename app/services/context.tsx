import React, { createContext, useMemo, useReducer } from "react";
import {
  authActions,
  AuthActions,
  authReducer,
  AuthState,
  initialAuthState,
} from "../reducers/auth";
import {
  initialUserState,
  userActions,
  UserActions,
  userReducer,
  UserState,
} from "../reducers/user";

export const AuthContext = createContext<{
  state: Partial<AuthState>;
  actions: AuthActions;
}>({});

export const UserContext = createContext<{
  state: UserState;
  actions: UserActions;
}>({});

export const CombinedContext = ({ children }: { children: JSX.Element }) => {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);
  const [auth, authDispatch] = useReducer(authReducer, initialAuthState);
  const userContext = useMemo(() => userActions(userDispatch), []);
  const authContext = useMemo(
    () => authActions(authDispatch, userDispatch),
    []
  );
  return (
    <AuthContext.Provider value={{ state: auth, actions: authContext }}>
      <UserContext.Provider value={{ state: user, actions: userContext }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};
