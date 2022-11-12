'use strict';

const urlApi = 'https://breakingbadapi.com/api/characters';
const sectionCharact = document.querySelector('.js-characters');

fetch(urlApi)
  .then((response) => response.json())
  .then((data) => {
    console.log('Data from API', data);

    renderAllCharacters(data);
  });

function renderAllCharacters(data) {
  let html = '';

  for (const character of data) {
    const name = character.name;
    const imgSrc = character.img;
    const status = character.status;
    const id = character.char_id;
    html += `<article id="${id}">
    <img src="${imgSrc}" alt="Imagen de personaje de Breaking Bad" width="200" />
    <h3>${name}</h3>
    <h4>${status}</h4>
  </article>`;
  }
  sectionCharact.innerHTML = html;
}
