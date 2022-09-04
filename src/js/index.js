import '../css/styles.css'; //import the css file
import logo from '../assets/images/logoRecipeEasy.svg'; //import the logo image
import searchImg from '../assets/images/search-icons.svg'; //import the search image
import randomImg from '../assets/images/random-icon.svg';
import { search } from './search.js';
import { renderCategories } from './category';

const imageLogo = document.getElementById('logo');
imageLogo.src = logo;

const footerLogo = document.getElementById('footer-logo');
footerLogo.src = logo;

const searchIcon = document.getElementById('searchIcon');
searchIcon.src = searchImg;

const randomIcon = document.getElementById('randomIcon');
randomIcon.src = randomImg;

// DOM elements
const inputMeals = document.querySelector('#input-meals');
const buttonToSearch = document.querySelector('.btn-search');

buttonToSearch.addEventListener('click', () => {
  const textToSearch = inputMeals.value;
  search(textToSearch);
});

// Get gategories
renderCategories();
