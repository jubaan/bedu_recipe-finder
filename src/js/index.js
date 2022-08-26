import '../css/styles.css'; //import the css file
import logo from '../assets/images/logoRecipeEasy.svg'; //import the logo image
import searchImg from '../assets/images/search-icons.svg'; //import the search image
import randomImg from '../assets/images/random-icon.svg';

const imageLogo = document.getElementById('logo')
imageLogo.src = logo;

const searchIcon = document.getElementById('searchIcon')
searchIcon.src = searchImg;

const randomIcon = document.getElementById('randomIcon')
randomIcon.src = randomImg;
