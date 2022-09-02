import { API } from './utils.js';
import { getDataInJson } from './utils.js';


export async function search(text, container, defaultLayout) {
  renderLoader(container);
  try {
    const searchUrl = `${API.base}${API.search}?s=${text}`;
    const { meals: mealsFound } = await getDataInJson(searchUrl);
    if (!mealsFound) throw new Error('😢');

    renderMealsFound(mealsFound, container);

  } catch (error) {
    handlerError(error);
  }
}


function handlerError(error) {
  console.log(error)
}

function renderMealsFound(mealsList, container) {
  const sectionMeals = document.createElement('section');
  sectionMeals.classList.add('meals');
  const titleSection = document.createElement('h2');
  titleSection.classList.add('title');
  titleSection.textContent = 'Search Results';
  const divContainer = document.createElement('div');
  divContainer.classList.add('meals-content');

  sectionMeals.append(titleSection, divContainer);

  const mealsHtml = mealsList.map(meal => createMealCard(meal));
  mealsHtml.forEach(mealHtml => divContainer.appendChild(mealHtml));

  cleanDOM(container);
  container.appendChild(sectionMeals);
}


function createMealCard(meal) {
  const templateCard = document.querySelector('.meal').content.querySelector('.meals-card').cloneNode(true);
  const { strMeal, strMealThumb } = meal;

  templateCard.querySelector('img').src = strMealThumb;
  templateCard.querySelector('img').alt = strMeal;
  templateCard.querySelector('p').textContent = strMeal;
  return templateCard;
}


function cleanDOM(container) {
  container.innerHTML = '';
}


function renderLoader(container) {
  cleanDOM(container);
  const spanLoader = document.createElement('span');
  spanLoader.classList.add('loader');

  container.appendChild(spanLoader);
}
