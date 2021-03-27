import axios from "axios";
import { PLANT_URL } from "../constants/Api";
import { Plant } from "../constants/Interfaces";

export const fetchPlants = async (): Promise<Array<Plant>> => {
  try {
    const { data: plants } = await axios.get<Array<Plant>>(PLANT_URL);
    return plants;
  } catch (error) {
    throw error;
  }
};
