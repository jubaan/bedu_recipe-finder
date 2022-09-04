// ES6 Modules
import backArrowIcon from '../assets/icons/arrow-back.svg';
import { API, getDataInJson, createMealCard, addLodeMoreBtn } from './utils.js';
import { renderCategories, renderMealsByCategory } from './category.js';
import Swal from 'sweetalert2';



export async function search(text, container, defaultLayout) {
  try {
    renderLoader(container);
    const searchUrl = `${API.base}${API.search}?s=${text}`;
    const { meals: mealsFound } = await getDataInJson(searchUrl);
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

  // Add the meals found or show a message
  if (mealsList) {
    const mealsHtml = mealsList.map(meal => createMealCard(meal));
    mealsHtml.slice(0, 9).forEach(mealHtml => divMealsContainer.appendChild(mealHtml));
    if (mealsHtml.slice(9).length) addLodeMoreBtn(divMealsContainer, mealsHtml.slice(9));
  }
  else {
    const pMessage = document.createElement('p');
    pMessage.classList.add('results__message');
    pMessage.textContent = 'No results found';
    divMealsContainer.appendChild(pMessage);
    Swal.fire({
      title: 'Make sure you are writing well your search',
      toast: true,
      position: 'top-end',
      timer: 2000,
      icon: 'info',
      showConfirmButton: false,
    });
  }

  cleanDOM(container);
  container.appendChild(sectionMeals);
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
  renderCategories();
  renderMealsByCategory('beef');
  document.querySelector('#input-meals').value = '';
}
