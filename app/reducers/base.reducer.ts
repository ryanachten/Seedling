import { Action, Failure } from "typescript-fsa";

export type BaseState = {
  loading: boolean;
  error: string | null;
};

export enum baseTypes {
  ERROR = "ERROR",
  LOADING = "LOADING",
}

export type BaseActions =
  | {
      type: baseTypes.ERROR;
      error: string;
    }
  | {
      type: baseTypes.LOADING;
    };

export const handleLoading = (state: BaseState) => {
  state.loading = true;
  state.error = null;
};

export const handleError = (
  state: BaseState,
  { payload }: Action<Failure<any, {}>>
) => {
  state.error = `${payload}`;
  state.loading = false;
};
