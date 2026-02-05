const BASE_URL = "https://pokeapi.co/api/v2";

export const makeAPIRequest = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
