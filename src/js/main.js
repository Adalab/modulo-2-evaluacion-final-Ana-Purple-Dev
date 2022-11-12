'use strict';

const urlApi = 'https://breakingbadapi.com/api/characters';

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

    console.log(name, imgSrc, status, id);
  }
}
