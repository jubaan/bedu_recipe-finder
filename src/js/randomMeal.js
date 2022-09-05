// import
import { API, getDataInJson } from './utils.js';

const mealModalTemplate = document
  .querySelector('.meal')
  .content.querySelector('.modal')
  .cloneNode(true);
const body = document.body;

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

const generateModal = (meal) => {
  mealModalTemplate.querySelector(
    '.meal__image'
  ).style.backgroundImage = `url('${meal.strMealThumb}`;
  mealModalTemplate.querySelector('.meal__name').textContent = meal.strMeal;
  mealModalTemplate.querySelector(
    '.meal__preparation-instructions'
  ).textContent = meal.strInstructions;

  const ingredientContainer =
    mealModalTemplate.querySelector('.ingredients__list');
  const ingredients = getIngredients(meal).map((i) => {
    return i.replace(/^\s+|\s+$/g, '') !== '' && i !== ' null' && i !== 'null null'
      ? i
      : undefined;
  });

  ingredientContainer.innerHTML = '';
  ingredients.forEach((ingredient) => {
    if (ingredient !== undefined) {
      let ingredientLi = document.createElement('li');
      ingredientLi.textContent = ingredient;
      ingredientContainer.appendChild(ingredientLi);
    }
  });

  const closeButton = mealModalTemplate.querySelector('.close__button');

  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    // Appear the scroll from the body
    document.body.style.overflow = 'auto';
    e.target.parentElement.parentElement.parentElement.parentElement.remove();
  });

  // dissapear the scroll from the body
  document.body.style.overflow = 'hidden';
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
