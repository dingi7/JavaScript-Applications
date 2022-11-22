import { htmlGen } from "./htmlGen.js";
import { fixNav } from "./navigation.js";
import { showAddPage } from "./addMovie.js";
import { showDetailsPage } from "./movieDetails.js";
//import showMovieDetais

function showHome() {
  fixNav();
  const sections = [...document.querySelectorAll("section")];
  sections.forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById("home-page").style.display = "block";
  document.getElementById("movie").style.display = "block";
  if (sessionStorage.accessToken) {
    document.getElementById("add-movie-button").style.display = "block";
    document
      .getElementById("add-movie-button")
      .addEventListener("click", showAddPage);
  } else {
    document.getElementById("add-movie-button").style.display = "none";
  }
  loadMovies()
    .then((data) => displayMovies(data))
    .catch((err) => console.log(err));
}

async function loadMovies() {
  const response = await fetch("http://localhost:3030/data/movies");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

async function displayMovies(data) {
  const movieList = document.getElementById("movies-list");
  const fragment = document.createDocumentFragment();
  data.forEach((movie) => {
    let li = htmlGen("li", undefined, "card", fragment);
    let img = htmlGen("img", null, "img-thumbnail", li);
    img.src = movie.img;
    htmlGen("h3", movie.title, undefined, li);
    let button = htmlGen("button", "Details", "btn btn-info", li);
    button.id = movie._id;
    button.addEventListener('click',showDetailsPage);
  });
  movieList.replaceChildren(fragment);
}

export { showHome };
