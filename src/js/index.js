// Import for the files
import '../css/styles.css'; //import the css file
import logo from '../assets/images/logoRecipeEasy.svg'; //import the logo image
import searchImg from '../assets/images/search-icons.svg'; //import the search image
import randomImg from '../assets/images/random-icon.svg';

// import for the js
import { search } from './search.js';
import { renderCategories } from './category';

// set the images
const imageLogo = document.getElementById('logo')
imageLogo.src = logo;

const footerLogo = document.getElementById('footer-logo');
footerLogo.src = logo;

const searchIcon = document.getElementById('searchIcon')
searchIcon.src = searchImg;

const randomIcon = document.getElementById('randomIcon')
randomIcon.src = randomImg;


// DOM elements
const inputMeals = document.querySelector('#input-meals');
const buttonToSearch = document.querySelector('.btn-search');
const container = document.querySelector('main');
const defaultLayout = document.querySelector('main').innerHTML;


// Events to search
buttonToSearch.addEventListener('click', () => {
  const textToSearch = inputMeals.value;
  search(textToSearch, container, defaultLayout);
});

inputMeals.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() !== 'enter') return;
  const textToSearch = inputMeals.value;
  search(textToSearch, container, defaultLayout);
});


// Get categories
renderCategories()
