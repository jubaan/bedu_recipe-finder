import { API } from './utils.js';
import { getDataInJson } from './utils.js';
import backArrowIcon from '../assets/icons/arrow-back.svg';

export async function search(text, container, defaultLayout) {
  renderLoader(container);
  try {
    const searchUrl = `${API.base}${API.search}?s=${text}`;
    const { meals: mealsFound } = await getDataInJson(searchUrl);
    if (!mealsFound) throw new Error('😢');

    renderMealsFound(mealsFound, container, defaultLayout);

  } catch (error) {
    handlerError(error);
  }
}


function handlerError(error) {
  console.log(error)
}

function renderMealsFound(mealsList, container, defaultLayout) {
  const sectionMeals = document.createElement('section');
  sectionMeals.classList.add('meals');

  const divInfo = document.createElement('div');
  divInfo.classList.add('meals__results-info');
  divInfo.innerHTML = `
    <h2 class="title">Search Results</h2>
    <button class="meals__back-btn" aria-label="Back to the begin page state">
      <span>Back</span>
      <img src="${backArrowIcon}" alt="Back to the default layout"/>
    </button>
  `;
  const divMealsContainer = document.createElement('div');
  divMealsContainer.classList.add('meals-content');

  sectionMeals.append(divInfo, divMealsContainer);

  // Listener to get back into the initial layout
  const btnBackLayout = sectionMeals.querySelector('.meals__back-btn');
  btnBackLayout.addEventListener('click', () => backToDefaultLayout(container, defaultLayout));

  // Add the meals found
  const mealsHtml = mealsList.map(meal => createMealCard(meal));
  mealsHtml.forEach(mealHtml => divMealsContainer.appendChild(mealHtml));

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


function backToDefaultLayout(container, defaultLayout) {
  cleanDOM(container);
  container.innerHTML = defaultLayout;
}
