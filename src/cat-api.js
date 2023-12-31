import axios from 'axios';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] =
  'live_OuioJkLhCWAX9mQcGi1vOIxA2yUtB2ArZJPGUdFxmcpSX2FjDJKMgcT6OoMk4Psj';

function fetchBreeds() {
  return axios.get('/breeds');
}

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_OuioJkLhCWAX9mQcGi1vOIxA2yUtB2ArZJPGUdFxmcpSX2FjDJKMgcT6OoMk4Psj';

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCatByBreed, fetchBreeds };
