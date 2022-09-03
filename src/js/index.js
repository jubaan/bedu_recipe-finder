import '../css/styles.css'; //import the css file
import logo from '../assets/images/logoRecipeEasy.svg'; //import the logo image
import searchImg from '../assets/images/search-icons.svg'; //import the search image
import randomImg from '../assets/images/random-icon.svg';

const imageLogo = document.getElementById('logo');
imageLogo.src = logo;

const footerLogo = document.getElementById('footer-logo');
footerLogo.src = logo;

const searchIcon = document.getElementById('searchIcon');
searchIcon.src = searchImg;

const randomIcon = document.getElementById('randomIcon');
randomIcon.src = randomImg;

const API = {
  base: 'https://www.themealdb.com/api/json/v1/1',
  search: '/search.php',
  random: '/random.php',
};

function getDataInJson(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

const randomButton = document.querySelector('.btn-random');
const mealModalTemplate = document
  .querySelector('.meal')
  .content.querySelector('.modal')
  .cloneNode(true);
let body = document.body

const getRandomMeal = async () => {
  const randomUrl = `${API.base}${API.random}`;
  const randomMeal = (await getDataInJson(randomUrl)).meals[0];
  
  body.append(mealModalTemplate)
  console.log(randomMeal);
};




randomButton.addEventListener('click', (e) => {
  e.preventDefault();
  let randomMeal = getRandomMeal;

  getRandomMeal();
});
