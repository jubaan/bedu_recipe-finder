import { API } from './utils.js';
import { getDataInJson } from './utils.js';

// CATEGORIES SECTON
const categorySection = document.querySelector("#categories-container");

function createCategory(category) {
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("category-card"); 
  categoryContainer.innerHTML = `
    <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
    <p>${category.strCategory}</p>`;
  
  categoryContainer.addEventListener("click", ()=> loadCategories(category.strCategory));
  return categoryContainer; 
}

async function loadCategories(category){
  const urlByCategory = `${API.base}${API.filter}?c=${category}`; 
  const mealsByCategory = await getDataInJson(urlByCategory); 
  console.log(mealsByCategory); 
  
}

export async function renderCategories() {
    const url =  `${API.base}${API.categories}`;
    const data = await getDataInJson(url);

  const categoriesHtml = data.categories.map((item) => {
    return createCategory(item);
  });

  const container = document.createElement("div");
  container.classList.add("category-card-container");
  categoriesHtml.forEach(category => container.appendChild(category));

  categorySection.appendChild(container);
}