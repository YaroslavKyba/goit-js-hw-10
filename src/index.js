import axios from 'axios';
import fetchCat from './cat-api';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] =
  'live_OuioJkLhCWAX9mQcGi1vOIxA2yUtB2ArZJPGUdFxmcpSX2FjDJKMgcT6OoMk4Psj';

axios
  .get('/breeds')
  .then(catsData => {
    const data = catsData.data;
    const dataMarkup = data
      .map(el => `<option value="${el.id}">${el.name}</option>`)
      .join('');
    select.innerHTML = dataMarkup;
  })
  .catch(err => {
    console.log(err);
  });

select.addEventListener('change', onSelectChange);

function onSelectChange(ev) {
  const breed_ids = ev.currentTarget.value;

  fetchCat
    .fetchCatByBreed(breed_ids)
    .then(data => {
      console.log(data);
      const { url } = data[0];
      console.log(url);
    })
    .catch(err => console.log(err));
}

// rl: 'https://cdn2.thecatapi.com/images/KWdLHmOqc.jpg'
// Коли користувач обирає якусь опцію в селекті, необхідно виконувати запит за повною інформацією про кота
// на ресурс https://api.thecatapi.com/v1/images/search.
// Не забудь вказати в цьому запиті параметр рядка запиту breed_ids з ідентифікатором породи.

// Ось як буде виглядати URL-запит для отримання повної інформації про собаку за ідентифікатором породи:

// https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи

// Напиши функцію fetchCatByBreed(breedId), яка очікує ідентифікатор породи, робить HTTP - запит і
// повертає проміс із даними про кота - результатом запиту.Винеси її у файл cat - api.js
// і зроби іменований експорт.

// Якщо запит був успішний, під селектом у блоці div.cat - info з'являється зображення
// і розгорнута інформація про кота: назва породи, опис і темперамент.
// ______________________________________

// Під час завантаження сторінки має виконуватися HTTP-запит за колекцією порід.
// Для цього необхідно виконати GET - запит на ресурс https://api.thecatapi.com/v1/breeds,
// що повертає масив об'єктів. У разі успішного запиту, необхідно наповнити select.breed-select
// опціями так, щоб value опції містило id породи, а в інтерфейсі користувачеві відображалася назва породи.

// Напиши функцію fetchBreeds(), яка виконує HTTP - запит і повертає проміс із масивом порід - результатом запиту.
// Винеси її у файл cat - api.js та зроби іменований експорт.
