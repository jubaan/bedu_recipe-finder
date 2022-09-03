export const API = {
  base: 'https://www.themealdb.com/api/json/v1/1',
  search: '/search.php',
  random: '/random.php',
  categories: '/categories.php',
  filter: '/filter.php'
}

export function getDataInJson(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err));
}

export function createMealCard(meal) {
  const templateCard = document.querySelector('.meal').content.querySelector('.meals-card').cloneNode(true);
  const { strMeal, strMealThumb } = meal;

  templateCard.querySelector('img').src = strMealThumb;
  templateCard.querySelector('img').alt = strMeal;
  templateCard.querySelector('p').textContent = strMeal;
  return templateCard;
}
