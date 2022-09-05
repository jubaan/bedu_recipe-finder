// Imports
import { API, getDataInJson, createMealCard, addLodeMoreBtn } from './utils.js';

// Create category by string parameter
function createCategory(category) {
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("category-card");
  categoryContainer.innerHTML = `
    <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
    <p>${category.strCategory}</p>`;

  categoryContainer.addEventListener("click", () => renderMealsByCategory(category.strCategory));
  return categoryContainer;
}

// Render the meals by category
export async function renderMealsByCategory(category) {
  const urlByCategory = `${API.base}${API.filter}?c=${category}`;
  const { meals: mealsByCategory } = await getDataInJson(urlByCategory);
  const mealsCategoryHtml = mealsByCategory.map(meal => createMealCard(meal))

  const titleCategory = document.querySelector('section.meals .title');
  titleCategory.textContent = `Meals (${category})`;
  const wrapperCategories = document.querySelector(".meals-content");
  const fragment = document.createDocumentFragment();
  mealsCategoryHtml.slice(0, 9).forEach(cardMeal => fragment.appendChild(cardMeal));
  wrapperCategories.innerHTML = "";
  wrapperCategories.appendChild(fragment);

  if (mealsByCategory.slice(9).length) {
    addLodeMoreBtn(wrapperCategories, mealsCategoryHtml.slice(9));
  }
}

// Render categories
export async function renderCategories() {
  const categorySection = document.querySelector("#categories-container");

  const url = `${API.base}${API.categories}`;
  const data = await getDataInJson(url);

  const categoriesHtml = data.categories.map((item) => {
    return createCategory(item);
  });

  const container = document.createElement("div");
  container.classList.add("category-card-container");
  categoriesHtml.forEach(category => container.appendChild(category));

  categorySection.appendChild(container);
}
