'use strict';

/*Variables globales*/
const urlApi = 'https://breakingbadapi.com/api/characters';
const sectionCharact = document.querySelector('.js-characters');
const searchBtn = document.querySelector('.js-btn');
const searchInput = document.querySelector('.js-search');
const sectionFavCharact = document.querySelector('.js-favourites');

let characters = [];
let favCharacters = [];

/*Llamada a la api*/
fetch(urlApi)
  .then((response) => response.json())
  .then((data) => {
    console.log('Data from API', data);
    characters = data;

    renderAllCharacters(data);
  });

/*FUNCIONES*/

/*Pinta todos los characters*/
function renderAllCharacters(data) {
  let html = `<h2 class="main__sectionCharact--title">Characters</h2>`;

  for (const character of data) {
    const name = character.name;
    const imgSrc = character.img;
    const status = character.status;
    const id = character.char_id;

    html += `<article id="${id}" class="main__sectionCharact--card">
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
/*Bonus: Si está en section favoritos que aparezca con una clase seleccionado en section Characters.*/

/*Pinta los characters en la sección favoritos*/
function renderSectionFavCharacter(favCharacters) {
  let html = ` <h2 class="main__sectionFav--title">Favourites</h2>
  <button class="js-deleteFavBtn main__sectionFav--deleteBtn">
    Borrar todos
  </button>`;

  for (const character of favCharacters) {
    const name = character.name;
    const imgSrc = character.img;
    const status = character.status;
    const id = character.char_id;

    html += `<article id="${id}" class="main__sectionFav--card selected">
    <i data-id="${id}" class="js-iconX fa-solid fa-x main__sectionFav--card--icon"></i>
    <img src="${imgSrc}" alt="Imagen de personaje de Breaking Bad" width="200" />
    <h3>${name}</h3>
    <h4>${status}</h4>
    </article>`;
  }
  sectionFavCharact.innerHTML = html;

  //const allArticles = document.querySelectorAll('article');
  const allIconX = document.querySelectorAll('.js-iconX');
  const deleteFavBtn = document.querySelector('.js-deleteFavBtn');

  //for (const article of allArticles) {
  //  article.addEventListener('click', handleClickFavCharacter);
  //}
  for (const iconX of allIconX) {
    iconX.addEventListener('click', handleClickDeleteFavCharacter);
  }
  deleteFavBtn.addEventListener('click', handleClickDeleteAllFav);
}

/*Manejadora del botón buscar*/
function handleClickSearch(event) {
  event.preventDefault();

  const inputValue = searchInput.value;
  const filteredNames = characters.filter((character) =>
    character.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  renderAllCharacters(filteredNames);
}
/*Manejadora del botón Borrar todos los favoritos*/
function handleClickDeleteAllFav(event) {
  let html = ` <h2 class="sectionFav__title">Favourites</h2>
  <button class="js-deleteFavBtn sectionFav__deleteBtn">
    Borrar todos
  </button>`;
  favCharacters = [];
  html += favCharacters;
  sectionFavCharact.innerHTML = html;
  localStorage.removeItem('Favourites characters');
}
/*Manejadora del botón X Borrar un character favorito*/
function handleClickDeleteFavCharacter(event) {
  const selectedFavCharacterIndex = favCharacters.findIndex(
    (favCharacter) =>
      favCharacter.char_id === parseInt(event.currentTarget.dataset.id)
  );
  favCharacters.splice(selectedFavCharacterIndex, 1);
  renderSectionFavCharacter(favCharacters);
}

/*Manejadora de seleccionar un character y hacerlo favorito*/
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
  localStorage.setItem('Favourites characters', JSON.stringify(favCharacters));
}

/*Local storage*/
const savedFavCharacters = JSON.parse(
  localStorage.getItem('Favourites characters')
);

if (savedFavCharacters !== null) {
  favCharacters = savedFavCharacters;
  renderSectionFavCharacter(favCharacters);
}

/*EVENTOS*/
searchBtn.addEventListener('click', handleClickSearch);
