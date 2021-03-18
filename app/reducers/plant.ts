import axios from "axios";
import { PLANT_URL, SEARCH_URL } from "../constants/Api";
import { Plant, PlantForCreate, SearchResult } from "../constants/Interfaces";
import { BaseActions, BaseState, baseTypes } from "./base";

export enum plantTypes {
  GET_PLANTS = "GET_PLANTS",
  SEARCH_PLANT = "SEARCH_PLANT",
  CREATE_PLANT = "CREATE_PLANT",
}

export type PlantState = BaseState & {
  plants: Array<Plant>;
};

export type PlantAction =
  | BaseActions
  | {
      type: plantTypes.GET_PLANTS;
      plants: Array<Plant>;
    }
  | {
      type: plantTypes.SEARCH_PLANT;
    }
  | {
      type: plantTypes.CREATE_PLANT;
      plant: Plant;
    };

export type PlantActions = {
  getPlants: () => Promise<void>;
  searchPlant: (searchTerm: string) => Promise<Array<SearchResult> | undefined>;
  createPlant: (plant: PlantForCreate) => Promise<void>;
};

export const initialPlantState: PlantState = {
  plants: [],
  loading: false,
  error: null,
};

export const plantActions = (
  dispatch: React.Dispatch<PlantAction>
): PlantActions => ({
  getPlants: async () => {
    try {
      dispatch({ type: baseTypes.LOADING });
      const { data: plants } = await axios.get<Array<Plant>>(PLANT_URL);
      dispatch({ type: plantTypes.GET_PLANTS, plants });
    } catch (error) {
      dispatch({ type: baseTypes.ERROR, error });
    }
  },
  createPlant: async (plantToCreate: PlantForCreate) => {
    try {
      dispatch({ type: baseTypes.LOADING });
      const { data: plant } = await axios.post<Plant>(PLANT_URL, plantToCreate);
      dispatch({ type: plantTypes.CREATE_PLANT, plant });
    } catch (error) {
      dispatch({ type: baseTypes.ERROR, error });
    }
  },
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
    case baseTypes.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case baseTypes.LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case plantTypes.SEARCH_PLANT: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case plantTypes.GET_PLANTS: {
      return {
        ...state,
        plants: action.plants,
        loading: false,
        error: null,
      };
    }
    case plantTypes.CREATE_PLANT: {
      const plants = [...state.plants, action.plant];
      return {
        ...state,
        plants,
        loading: false,
        error: null,
      };
    }

    default:
      return state;
  }
};
