import { showView, e } from "./dom.js";
import { showCreate } from "./create.js";
import { showDetails } from "./details.js";
const section = document.getElementById("home-page");

function showHome(){
    section.remove();
    showView(section);
    const addBtn = section.querySelector("a");
    addBtn.addEventListener("click",showCreate);
    if(sessionStorage.accessToken){
        addBtn.style.display = "inline-block";
    }
    else{
        addBtn.style.display = "none";
    }
    getMovieData();
}

async function getMovieData(){
    const ulToAttach = section.querySelector("ul");
    ulToAttach.replaceChildren(e("h1","Loading..."));
    const response = await fetch("http://localhost:3030/data/movies");
    const data = await response.json();
    ulToAttach.replaceChildren();
    data.map(async(movie) => await displayMovie(movie));
}

async function displayMovie(movie){
    const ulToAttach = section.querySelector("ul");
    const div = e("div",undefined,"card mb-4");
    const img = e("img",undefined,"card-img-top");
    img.src = movie.img;
    img.width = "400";
    img.alt = "Card image cap";
    const div2 = e("div",undefined,"card-body");
    const h4 = e("h4",movie.title,"card-title");
    const div3 = e("li",movie.title,"card-footer");
    const a = e("a")
    a.id = movie._id;
    const button = e("button","Details","btn btn-info");
    button.type = "button";
    button.id = movie._id;
    button.addEventListener("click",showDetails);
    a.appendChild(button);
    div3.appendChild(a);
    div2.appendChild(h4);
    div2.appendChild(div3);
    div.appendChild(img);
    div.appendChild(div2);
    ulToAttach.appendChild(div);
}
export {showHome}