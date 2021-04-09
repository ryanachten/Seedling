import axios from "axios";
import { PLANT_URL, SEARCH_URL } from "../constants/Api";
import { Plant, SearchResult } from "../constants/Interfaces";

export const fetchPlants = async (): Promise<Array<Plant>> => {
  try {
    const { data: plants } = await axios.get<Array<Plant>>(PLANT_URL);
    return plants;
  } catch (error) {
    throw error;
  }
};

export const searchPlants = async (
  term: string
): Promise<Array<SearchResult>> => {
  try {
    const { data: results } = await axios.get<Array<SearchResult>>(SEARCH_URL, {
      params: {
        q: term,
      },
    });
    return results;
  } catch (error) {
    throw error;
  }
};
