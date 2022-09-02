import { API } from './utils.js';
import { getDataInJson } from './utils.js';

// CATEGORIES SECTON
const categorySection = document.querySelector("#categories-container");

function createCategory(category) {
  return `
  <div class="category-card">
    <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
    <p>${category.strCategory}</p>
  </div>
  `;
}

export async function renderCategories() {
    const url =  `${API.base}${API.categories}`;
    const data = await getDataInJson(url);

  const categoriesHtml = data.categories.map((item) => {
    return createCategory(item);
  });

  const container = document.createElement("div");
  container.classList.add("category-card-container");
  container.innerHTML = categoriesHtml.join("");

  categorySection.appendChild(container);
}