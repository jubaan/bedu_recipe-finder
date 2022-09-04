import '../css/styles.css'; //import the css file
import logo from '../assets/images/logoRecipeEasy.svg'; //import the logo image
import searchImg from '../assets/images/search-icons.svg'; //import the search image
import randomImg from '../assets/images/random-icon.svg';
import { search } from './search.js';
import { renderCategories } from './category';
import { API, getDataInJson } from './utils';

const imageLogo = document.getElementById('logo');
imageLogo.src = logo;

const footerLogo = document.getElementById('footer-logo');
footerLogo.src = logo;

const searchIcon = document.getElementById('searchIcon');
searchIcon.src = searchImg;

const randomIcon = document.getElementById('randomIcon');
randomIcon.src = randomImg;

// DOM elements
const inputMeals = document.querySelector('#input-meals');
const buttonToSearch = document.querySelector('.btn-search');
const randomButton = document.querySelector('.btn-random');

buttonToSearch.addEventListener('click', () => {
  const textToSearch = inputMeals.value;
  search(textToSearch);
});

// Get gategories
renderCategories();

const mealModalTemplate = document
  .querySelector('.meal')
  .content.querySelector('.modal')
  .cloneNode(true);
const body = document.body;

const getRandomMeal = async () => {
  const randomUrl = `${API.base}${API.random}`;
  const randomMeal = (await getDataInJson(randomUrl)).meals[0];

  generateModal(randomMeal);

  return randomMeal;
};

const generateModal = async (meal) => {
  mealModalTemplate.querySelector(
    '.meal__image'
  ).style.backgroundImage = `url('${meal.strMealThumb}`;
  mealModalTemplate.querySelector('.meal__name').textContent = meal.strMeal;
  mealModalTemplate.querySelector(
    '.meal__preparation-instructions'
  ).textContent = meal.strInstructions;

  const ingredientContainer =
    mealModalTemplate.querySelector('.ingredients__list');
  getIngredients(meal).forEach((ingredient) => {
    if (ingredient && ingredient !== ' ' && ingredient !== '' && !!ingredient && (ingredient !== 'null' || ingredient !== 'null null')) {
      let ingredientLi = document.createElement('li');
      ingredientLi.textContent = ingredient;
      ingredientContainer.appendChild(ingredientLi);
    }
  });

  body.append(mealModalTemplate);
};

const getIngredients = (meal) => {
  const ingredients = [
    `${meal.strMeasure1} ${meal.strIngredient1}`,
    `${meal.strMeasure2} ${meal.strIngredient2}`,
    `${meal.strMeasure3} ${meal.strIngredient3}`,
    `${meal.strMeasure4} ${meal.strIngredient4}`,
    `${meal.strMeasure5} ${meal.strIngredient5}`,
    `${meal.strMeasure6} ${meal.strIngredient6}`,
    `${meal.strMeasure7} ${meal.strIngredient7}`,
    `${meal.strMeasure8} ${meal.strIngredient8}`,
    `${meal.strMeasure9} ${meal.strIngredient9}`,
    `${meal.strMeasure10} ${meal.strIngredient10}`,
    `${meal.strMeasure11} ${meal.strIngredient11}`,
    `${meal.strMeasure12} ${meal.strIngredient12}`,
    `${meal.strMeasure13} ${meal.strIngredient13}`,
    `${meal.strMeasure14} ${meal.strIngredient14}`,
    `${meal.strMeasure15} ${meal.strIngredient15}`,
    `${meal.strMeasure16} ${meal.strIngredient16}`,
    `${meal.strMeasure17} ${meal.strIngredient17}`,
    `${meal.strMeasure18} ${meal.strIngredient18}`,
    `${meal.strMeasure19} ${meal.strIngredient19}`,
    `${meal.strMeasure20} ${meal.strIngredient20}`,
  ];
  return ingredients;
};

randomButton.addEventListener('click', (e) => {
  e.preventDefault();

  getRandomMeal();
});

document.addEventListener('keydown', (e) => {
  console.log(e.key);

  if (e.key == 'escape') {
    console.log(document.querySelector('.modal'));

    // document.querySelector('.modal').remove;
  }
});
// =======
