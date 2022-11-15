"use strict";const urlApi="https://breakingbadapi.com/api/characters",sectionCharact=document.querySelector(".js-characters"),searchBtn=document.querySelector(".js-btn"),searchInput=document.querySelector(".js-search"),sectionFavCharact=document.querySelector(".js-favourites");let characters=[],favCharacters=[];function renderAllCharacters(a){let e='<h2 class="main__sectionCharact--title">Characters</h2>';for(const t of a){const a=t.name,r=t.img,c=t.status;e+=`<article id="${t.char_id}" class="main__sectionCharact--card">\n    <img src="${r}" alt="Imagen de personaje de Breaking Bad" width="200" />\n    <h3 class="main__sectionCharact--card--name">${a}</h3>\n    <h4 class="main__sectionCharact--card--status">${c}</h4>\n    </article>`}sectionCharact.innerHTML=e;const t=document.querySelectorAll("article");for(const a of t)a.addEventListener("click",handleClickFavCharacter)}function renderSectionFavCharacter(a){let e=' <h2 class="main__sectionFav--title">Favourites</h2>\n  <button class="js-deleteFavBtn main__sectionFav--deleteBtn">\n    Borrar todos\n  </button>';for(const t of a){const a=t.name,r=t.img,c=t.status,n=t.char_id;e+=`<article id="${n}" class="main__sectionFav--card selected">\n    <i data-id="${n}" class="js-iconX fa-solid fa-x main__sectionFav--card--icon"></i>\n    <img src="${r}" alt="Imagen de personaje de Breaking Bad" width="200" />\n    <h3 class="main__sectionCharact--card--name">${a}</h3>\n    <h4 class="main__sectionCharact--card--status">${c}</h4>\n    </article>`}sectionFavCharact.innerHTML=e;const t=document.querySelectorAll(".js-iconX"),r=document.querySelector(".js-deleteFavBtn");for(const a of t)a.addEventListener("click",handleClickDeleteFavCharacter);r.addEventListener("click",handleClickDeleteAllFav)}function handleClickSearch(a){a.preventDefault();const e=searchInput.value;renderAllCharacters(characters.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())))}function handleClickDeleteAllFav(a){let e=' <h2 class="sectionFav__title">Favourites</h2>\n  <button class="js-deleteFavBtn sectionFav__deleteBtn">\n    Borrar todos\n  </button>';favCharacters=[],e+=favCharacters,sectionFavCharact.innerHTML=e,localStorage.removeItem("Favourites characters")}function handleClickDeleteFavCharacter(a){const e=favCharacters.findIndex(e=>e.char_id===parseInt(a.currentTarget.dataset.id));favCharacters.splice(e,1),renderSectionFavCharacter(favCharacters)}function handleClickFavCharacter(a){const e=characters.find(e=>e.char_id===parseInt(a.currentTarget.id)),t=favCharacters.findIndex(a=>a.char_id===e.char_id);-1===t?favCharacters.push(e):favCharacters.splice(t,1),renderSectionFavCharacter(favCharacters),localStorage.setItem("Favourites characters",JSON.stringify(favCharacters))}fetch(urlApi).then(a=>a.json()).then(a=>{console.log("Data from API",a),characters=a,renderAllCharacters(a)});const savedFavCharacters=JSON.parse(localStorage.getItem("Favourites characters"));null!==savedFavCharacters&&(favCharacters=savedFavCharacters,renderSectionFavCharacter(favCharacters)),searchBtn.addEventListener("click",handleClickSearch);