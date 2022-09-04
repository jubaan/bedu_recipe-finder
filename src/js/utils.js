const mealModalTemplate = document
  .querySelector('.meal')
  .content.querySelector('.modal')
  .cloneNode(true);
const body = document.body;

import arrowDownIcon from '../assets/icons/load-more.svg';
import { renderCategories, renderMealsByCategory } from './category.js';

// API information
export const API = {
  base: 'https://www.themealdb.com/api/json/v1/1',
  search: '/search.php',
  random: '/random.php',
  categories: '/categories.php',
  filter: '/filter.php',
  lookUp: '/lookUp.php',
};

// Num of meals to load initially
const NUM_MEALS_TO_LOAD = 9;

// Init the render in the page
export function initRender() {
  // render categories
  const initialCategory = 'beef';
  renderCategories();
  // Render the initial meals
  renderMealsByCategory(initialCategory);
}

// Get the data in JSON
export function getDataInJson(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

// Create a new card meal
export function createMealCard(meal) {
  const templateCard = document
    .querySelector('.meal')
    .content.querySelector('.meals-card')
    .cloneNode(true);
  const { strMeal, strMealThumb } = meal;

  templateCard.querySelector('img').src = strMealThumb;
  templateCard.querySelector('img').alt = strMeal;
  templateCard.querySelector('p').textContent = strMeal;
  templateCard.addEventListener('click', () => {
    getMeal(meal);
  });

  return templateCard;
}

// Render more meals
export function renderMoreMeals(restList, container, event) {
  event.target.parentElement.remove();
  const fragment = document.createDocumentFragment();
  restList
    .slice(0, NUM_MEALS_TO_LOAD)
    .forEach((cardMeal) => fragment.appendChild(cardMeal));
  container.appendChild(fragment);
  if (restList.slice(NUM_MEALS_TO_LOAD).length) {
    addLodeMoreBtn(container, restList.slice(NUM_MEALS_TO_LOAD));
  }
}

// Render the button to load more meals
export function addLodeMoreBtn(refContainer, restMeals) {
  const addMoreTemplate = document
    .querySelector('.meal')
    .content.querySelector('.add__more')
    .cloneNode(true);
  
  addMoreTemplate
    .querySelector('button')
    .addEventListener('click', (event) =>
      renderMoreMeals(restMeals, refContainer, event)
    );
  addMoreTemplate.querySelector('img').src = arrowDownIcon;
  refContainer.appendChild(addMoreTemplate);
}

export const getRandomMeal = async () => {
  const randomUrl = `${API.base}${API.random}`;
  const randomMeal = (await getDataInJson(randomUrl)).meals[0];

  generateModal(randomMeal);

  return randomMeal;
};

export const getMeal = async (meal) => {
  const url = `${API.base}${API.lookUp}?i=${meal.idMeal}`;
  const retrievedMeal = (await getDataInJson(url)).meals[0];

  generateModal(retrievedMeal);

  return retrievedMeal;
};

export const generateModal = (meal) => {
  mealModalTemplate.querySelector(
    '.meal__image'
  ).style.backgroundImage = `url('${meal.strMealThumb}`;
  mealModalTemplate.querySelector('.meal__name').textContent = meal.strMeal;
  mealModalTemplate.querySelector(
    '.meal__preparation-instructions'
  ).textContent = meal.strInstructions;

  const ingredientContainer =
    mealModalTemplate.querySelector('.ingredients__list');

  ingredientContainer.innerHTML = '';
  getIngredients(meal).forEach((ingredient) => {
    if (
      ingredient !== ' ' ||
      ingredient !== '   ' ||
      ingredient !== '' ||
      ingredient !== 'null' ||
      ingredient !== 'null null'
    ) {
      let ingredientLi = document.createElement('li');
      ingredientLi.textContent = ingredient;
      ingredientContainer.appendChild(ingredientLi);
    }
  });

  const closeButton = mealModalTemplate.querySelector('.close__button');

  closeButton.addEventListener('click', (e) => {
    e.preventDefault();

    e.target.parentElement.parentElement.parentElement.parentElement.remove();
  });

  body.append(mealModalTemplate);
};

export const getIngredients = (meal) => {
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
