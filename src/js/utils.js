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

  return mealCard;
}


{/* <div class="modal">
  <div class="meal">
    <div
      class="meal__image"
      style="background-image: url(https://www.themealdb.com/images/media/meals/1550441882.jpg);"
    >
      <div class="meal__closing-button"></div>
    </div>
    <div class="meal__details">
      <div class="meal__title">
        <h2 class="meal__name"></h2>
      </div>
      <div class="meal__ingredients">
        <h2 class="ingredients__title">Ingredients</h2>
        <ul class="ingredients__list">
          <li class="ingredient">Potatoes</li>
          <li class="ingredient">Olive Oil</li>
          <li class="ingredient">Bacon</li>
          <li class="ingredient">Garlic Clove</li>
          <li class="ingredient">Maple Syrup</li>
          <li class="ingredient">Parsley</li>
          <li class="ingredient">Salt</li>
          <li class="ingredient">Pepper</li>
          <li class="ingredient">Allspice</li>
        </ul>
      </div>

      <div class="meal__instructions">
        <h2 class="instructions__title">Instructions</h2>
        <p class="meal__preparation-instructions"></p>
      </div>
    </div>
  </div>
</div>;

export function createModalCard(meal) {
  const modalCard = document
    .querySelector('.meal')
    .content.querySelector('.modal')
    .cloneNode(true);
  

  modalCard.querySelector('.meal__name').textContent = meal.strMeal;
  modalCard.querySelector('.meal__preparation-instructions').textContent = meal.strInstructions;
  modalCard.querySelector('img').alt = strMeal;
  modalCard.querySelector('p').textContent = strMeal;
  console.log(modalCard);
  return modalCard;
}

export function getAllIngredients(meal) {
  meal.map
} */}
