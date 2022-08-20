import '../css/global.css'; //import the global css file
import logo from '../assets/images/logoRecipeEasy.svg'; //import the logo image

const header = document.querySelector('header');
const imgElement = document.createElement('img');
imgElement.src = logo;
header.appendChild(imgElement);
