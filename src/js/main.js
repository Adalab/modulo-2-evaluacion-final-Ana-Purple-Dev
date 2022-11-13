'use strict';

const urlApi = 'https://breakingbadapi.com/api/characters';
const sectionCharact = document.querySelector('.js-characters');
const searchBtn = document.querySelector('.js-btn');
const searchInput = document.querySelector('.js-search');
const sectionFavCharact = document.querySelector('.js-favourites');
let characters = [];
let favCharacters = [];

fetch(urlApi)
  .then((response) => response.json())
  .then((data) => {
    console.log('Data from API', data);
    characters = data;

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

  // Añado el evento aquí porque es cuando está disponible el article en el HTML
  const allArticles = document.querySelectorAll('article');

  for (const article of allArticles) {
    article.addEventListener('click', handleClickFavCharacter);
  }
}

function handleClickSearch(event) {
  event.preventDefault();
  console.log('he hecho click');
}

function handleInput(event) {
  event.preventDefault();

  const inputValue = searchInput.value;
  const filteredNames = characters.filter((character) =>
    character.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  renderAllCharacters(filteredNames);
}

function renderSectionFavCharacter(favCharacters) {
  let html = '';

  for (const character of favCharacters) {
    const name = character.name;
    const imgSrc = character.img;
    const status = character.status;
    const id = character.char_id;

    html += `<article id="${id}" class="selected">
    <img src="${imgSrc}" alt="Imagen de personaje de Breaking Bad" width="200" />
    <h3>${name}</h3>
    <h4>${status}</h4>
    </article>`;
  }

  sectionFavCharact.innerHTML = html;

  const allArticles = document.querySelectorAll('article');

  for (const article of allArticles) {
    article.addEventListener('click', handleClickFavCharacter);
  }
}

function handleClickFavCharacter(event) {
  const selectedCharacter = characters.find(
    (character) => character.char_id === parseInt(event.currentTarget.id)
  );

  const selectedCharacterIndex = favCharacters.findIndex(
    (character) => character.char_id === selectedCharacter.char_id
  );

  if (selectedCharacterIndex === -1) {
    favCharacters.push(selectedCharacter);
  } else {
    favCharacters.splice(selectedCharacterIndex, 1);
  }

  renderSectionFavCharacter(favCharacters);
}

searchBtn.addEventListener('click', handleClickSearch);
searchInput.addEventListener('input', handleInput);
