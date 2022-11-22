import { fixNav } from "./navbar.js";
import {showMovieDetailsPage} from "./movieDetails.js";

async function showHome(e){

    const sections = [...document.querySelectorAll("section")];
    sections.forEach(section => {
        section.style.display = "none";
    });
    document.getElementById("home-page").style.display = "block";
    document.getElementById("movie").style.display = "block";
    if(sessionStorage.accessToken){
        document.getElementById("add-movie-button").style.display = "block";
    }
    else{
        document.getElementById("add-movie-button").style.display = "none";
    }
    const movies = await loadMovies()
    showMovies(movies);
    fixNav();
}

async function loadMovies(){
    const response = await fetch("http://localhost:3030/data/movies");
    const data = await response.json();
    const movies = data.map(movie => {
        return {title: movie.title, description: movie.description, img: movie.img, id: movie._id};
    });
    return movies;
}

function showMovies(movies){
    const moviesUl = document.getElementById("movies-list");
    const fragment = document.createDocumentFragment();
    movies.forEach(movie => {
        const li = document.createElement("li");
        li.className = "card";
        li.innerHTML = `
        <img src="${movie.img}" alt="Movie" class="img-thumbnail">
        <h3>${movie.title}</h3>
        `;
        const button = document.createElement("button");
        button.className = "btn btn-info";
        button.id = movie.id;
        button.textContent = "Details";
        button.addEventListener("click", showMovieDetailsPage);
        li.appendChild(button);
        fragment.appendChild(li);
    });
    moviesUl.replaceChildren(fragment);
}

export {showHome};