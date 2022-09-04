const mealModalTemplate = document
  .querySelector('.meal')
  .content.querySelector('.modal')
  .cloneNode(true);
const body = document.body;

export const API = {
  base: 'https://www.themealdb.com/api/json/v1/1',
  search: '/search.php',
  random: '/random.php',
  categories: '/categories.php',
  filter: '/filter.php',
};

export function getDataInJson(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export function createMealCard(meal) {
  const mealCard = document
    .querySelector('.meal')
    .content.querySelector('.meals-card')
    .cloneNode(true);
  const { strMeal, strMealThumb } = meal;

  mealCard.querySelector('img').src = strMealThumb;
  mealCard.querySelector('img').alt = strMeal;
  mealCard.querySelector('p').textContent = strMeal;
  mealCard.addEventListener('click', () => {
    generateModal(meal)
  });

  return mealCard;
}

export const getRandomMeal = async () => {
  const randomUrl = `${API.base}${API.random}`;
  const randomMeal = (await getDataInJson(randomUrl)).meals[0];

  generateModal(randomMeal);

  return randomMeal;
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
  getIngredients(meal).forEach((ingredient) => {
    if (
      ingredient &&
      ingredient !== ' ' &&
      ingredient !== '' &&
      !!ingredient &&
      (ingredient !== 'null' || ingredient !== 'null null')
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
