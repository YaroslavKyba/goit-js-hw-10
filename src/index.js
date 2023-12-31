import { fetchCatByBreed, fetchBreeds } from './cat-api.js';
import {
  createCatInfoMarkup,
  createFetchBreedsMarkup,
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

disableSelect();
disableError();

fetchBreeds()
  .then(catsData => {
    // enableLoader();
    createFetchBreedsMarkup(catsData.data, select);
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
