import { API } from './utils.js';
import { getDataInJson } from './utils.js';
import { createMealCard } from './utils.js';

export async function search(text) {
  try {
    const searchUrl = `${API.base}${API.search}?s=${text}`;
    const { meals: mealsFound } = await getDataInJson(searchUrl);
    if (!mealsFound) throw new Error('😢');

    renderMealsFound(mealsFound);

  } catch (error) {
    handlerError(error);
  }
}


function handlerError(error) {
  console.log(error)
}

function renderMealsFound(mealsList) {
  const container = document.querySelector('.meals-content');
  const mealsHtml = mealsList.map(meal => createMealCard(meal));
  const fragment = document.createDocumentFragment();

  mealsHtml.forEach(mealHtml => fragment.appendChild(mealHtml));
  container.appendChild(fragment);
}
