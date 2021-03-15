import axios from "axios";
import { SEARCH_URL } from "../constants/Api";
import { Plant, SearchResult } from "../constants/Interfaces";
import { BaseActions, BaseState, baseTypes } from "./base";

export enum plantTypes {
  SEARCH_PLANT = "SEARCH_PLANT",
}

export type PlantState = BaseState & {
  plants: Array<Plant>;
};

export type PlantAction =
  | BaseActions
  | {
      type: plantTypes.SEARCH_PLANT;
    };

export type PlantActions = {
  searchPlant: (searchTerm: string) => Promise<Array<SearchResult> | undefined>;
};

export const initialPlantState: PlantState = {
  plants: [],
  loading: false,
  error: null,
};

export const plantActions = (
  dispatch: React.Dispatch<PlantAction>
): PlantActions => ({
  searchPlant: async (searchTerm: string) => {
    dispatch({ type: baseTypes.LOADING });
    try {
      const { data: searchResults } = await axios.get<Array<SearchResult>>(
        SEARCH_URL,
        {
          params: {
            q: searchTerm,
          },
        }
      );
      dispatch({ type: plantTypes.SEARCH_PLANT });
      return searchResults;
    } catch (e) {
      dispatch({ type: baseTypes.ERROR, error: e.message });
    }
  },
});

export const plantReducer = (
  state: PlantState,
  action: PlantAction
): PlantState => {
  switch (action.type) {
    case baseTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case baseTypes.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case plantTypes.SEARCH_PLANT:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
