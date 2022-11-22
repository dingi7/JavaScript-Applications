import { html, render } from "./node_modules/lit-html/lit-html.js";

window.onload = () => {
   document.querySelector('button').addEventListener('click', onClick);
   update();
}

function onClick(e){
   [...document.querySelectorAll('tr')].forEach(tr => tr.classList = "");
   e.preventDefault();
   const input = document.getElementById('searchField').value;
   if(!input){ return}  
   const search = document.querySelectorAll('td');
   search.forEach(e => {
      if (e.textContent.includes(input)) {
         e.parentNode.classList.add('select');
      } else {
         e.classList.remove('active');
      }
   });
}

async function getEntries(){
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   return Object.values(data);
}

async function update(){
   const root = document.querySelector('tbody');
   const template = (data) => html`
               <tr>
                <td>${data.firstName} ${data.lastName}</td>
                <td>${data.email}</td>
                <td>${data.course}</td>
               </tr>`;
   const entries = await getEntries();
   render(html`${entries.map(template)}`, root);
}