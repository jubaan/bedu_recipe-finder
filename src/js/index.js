import '../css/styles.css'; //import the css file
import logo from '../assets/images/logoRecipeEasy.svg'; //import the logo image
import searchImg from '../assets/images/search-icons.svg'; //import the search image
import randomImg from '../assets/images/random-icon.svg';

import { search } from './search.js';


const imageLogo = document.getElementById('logo')
imageLogo.src = logo;

const footerLogo = document.getElementById('footer-logo');
footerLogo.src = logo;

const searchIcon = document.getElementById('searchIcon')
searchIcon.src = searchImg;

const randomIcon = document.getElementById('randomIcon')
randomIcon.src = randomImg;


// DOM elements
const inputMeals = document.querySelector('#input-meals');
const buttonToSearch = document.querySelector('.btn-search');

buttonToSearch.addEventListener('click', () => {
  const textToSearch = inputMeals.value;
  search(textToSearch);
});


// CATEGORIES SECTON
const API = "https://www.themealdb.com/api/json/v1/1/categories.php";
const categorySection = document.querySelector("#categories-container");

function getDataInJson(url) {
  return fetch(API)
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
}

function createCategory(category) {
  return `
  <div class="category-card">
    <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
    <p>${category.strCategory}</p>
  </div>
  `;
}

async function renderCategories() {
  const data = await getDataInJson(API);

  const categoriesHtml = data.categories.map((item) => {
    return createCategory(item);
  });

  const container = document.createElement("div");
  container.classList.add("category-card-container");
  container.innerHTML = categoriesHtml.join("");

  categorySection.appendChild(container);
}

renderCategories();
