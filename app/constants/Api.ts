const API_URL = "https://seedling-app-api.herokuapp.com"; //"https://53ac04f929c1.ngrok.io";

// Unauthorized endpoints
export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/auth/register`;

// Authorized endpoints
export const SEARCH_URL = `${API_URL}/search`;
export const PLANT_URL = `${API_URL}/plant`;
