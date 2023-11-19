import axios from 'axios';

import { fetchCatByBreed } from './cat-api.js';
import {
  createCatInfoMarkup,
  enableLoader,
  disableLoader,
  enableSelect,
  disableSelect,
  enableCatInfo,
  disableCatInfo,
  enableError,
  disableError,
} from './helper';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] =
  'live_OuioJkLhCWAX9mQcGi1vOIxA2yUtB2ArZJPGUdFxmcpSX2FjDJKMgcT6OoMk4Psj';

disableSelect();
disableError();

axios
  .get('/breeds')
  .then(catsData => {
    enableLoader();
    const data = catsData.data;
    const dataMarkup = data
      .map(el => `<option value="${el.id}">${el.name}</option>`)
      .join('');

    select.innerHTML = dataMarkup;
  })
  .catch(_ => {
    enableError();
  })
  .finally(() => {
    disableLoader();
    enableSelect();
  });

select.addEventListener('change', onSelectChange);

function onSelectChange(ev) {
  enableLoader();
  disableCatInfo();
  const breed_ids = ev.currentTarget.value;

  fetchCatByBreed(breed_ids)
    .then(data => {
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];
      createCatInfoMarkup(url, name, description, temperament);
    })
    .catch(_ => enableError())
    .finally(() => {
      disableLoader();
      enableCatInfo();
    });
}

export { select, catInfo, loader, error };
