import { select, catInfo, loader, error } from './index';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createCatInfoMarkup(url, name, description, temperament) {
  catInfo.innerHTML = `
        <div>
          <img src="${url}" alt="${name}" width="250"/>
          <h1>${name}</h1>
          <p>${description}</p>
          <p>Temperament: ${temperament}</p>
        </div>
      `;
}

function createFetchBreedsMarkup(data, select) {
  const dataMarkup = data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');

  select.innerHTML = dataMarkup;
}

function enableLoader() {
  loader.classList.remove('is-hidden');
}
function disableLoader() {
  loader.classList.add('is-hidden');
}

function enableSelect() {
  select.classList.remove('is-hidden');
}
function disableSelect() {
  select.classList.add('is-hidden');
}

function enableCatInfo() {
  catInfo.classList.remove('is-hidden');
}
function disableCatInfo() {
  catInfo.classList.add('is-hidden');
}

function enableError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
  error.classList.remove('is-hidden');
}
function disableError() {
  error.classList.add('is-hidden');
}

export {
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
};
