import arrowDownIcon from '../assets/icons/load-more.svg';
import { renderCategories, renderMealsByCategory } from './category.js';

// API information
export const API = {
  base: 'https://www.themealdb.com/api/json/v1/1',
  search: '/search.php',
  random: '/random.php',
  categories: '/categories.php',
  filter: '/filter.php'
}

// Num of meals to load initially
const NUM_MEALS_TO_LOAD = 9;

// Init the render in the page
export function initRender() {
  // render categories
  const initialCategory = 'beef';
  renderCategories()
  // Render the initial meals
  renderMealsByCategory(initialCategory);
}

// Get the data in JSON
export function getDataInJson(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err));
}

// Create a new card meal
export function createMealCard(meal) {
  const templateCard = document.querySelector('.meal').content.querySelector('.meals-card').cloneNode(true);
  const { strMeal, strMealThumb } = meal;

  templateCard.querySelector('img').src = strMealThumb;
  templateCard.querySelector('img').alt = strMeal;
  templateCard.querySelector('p').textContent = strMeal;
  return templateCard;
}

// Render more meals
export function renderMoreMeals(restList, container, event) {
  event.target.parentElement.remove();
  const fragment = document.createDocumentFragment();
  restList.slice(0, NUM_MEALS_TO_LOAD).forEach(cardMeal => fragment.appendChild(cardMeal));
  container.appendChild(fragment);
  if (restList.slice(NUM_MEALS_TO_LOAD).length) addLodeMoreBtn(container, restList.slice(NUM_MEALS_TO_LOAD));
}

// Render the button to load more meals
export function addLodeMoreBtn(refContainer, restMeals) {
  const addMoreTemplate = document.querySelector('.meal').content.querySelector('.add__more').cloneNode(true);
  addMoreTemplate.querySelector('button').addEventListener('click', (event) => renderMoreMeals(restMeals, refContainer, event));
  addMoreTemplate.querySelector('img').src = arrowDownIcon;
  refContainer.appendChild(addMoreTemplate);
}
