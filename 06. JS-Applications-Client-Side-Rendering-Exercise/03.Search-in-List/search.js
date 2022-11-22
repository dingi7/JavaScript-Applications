import {html,render} from './node_modules/lit-html/lit-html.js'
import { towns } from './towns.js';

function search() {
   const input = document.getElementById('searchText').value;
   const towns = document.querySelectorAll('li');
   let matches = 0;
   towns.forEach(town => {
      if (town.textContent.includes(input)) {
         town.classList.add('active');
         matches++;
      } else {
         town.classList.remove('active');
      }
   });
   document.getElementById('result').textContent = `${matches} matches found`;
}
document.querySelector("button").addEventListener("click", search);
const root = document.getElementById('towns');
const template = (town) => html`<li active="true">${town}</li>`

window.onload = () => render(html`<ul>${towns.map(template)}</ul>`, root);
