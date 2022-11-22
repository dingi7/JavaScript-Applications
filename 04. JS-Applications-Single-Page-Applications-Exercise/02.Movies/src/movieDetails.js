import {fixNav} from "./navbar.js";
import {showHome} from "./home.js";

function checkIfOwner(movie){
    return movie._ownerId === sessionStorage.getItem("userId");
}

async function getMovie(id){
    const response = await fetch("http://localhost:3030/data/movies/" + id);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    return data;
}

async function showMovieDetailsPage(e){
    const movieDetails = document.getElementById("movie-example");
    const movieId = e.target.id;
    const movie = await getMovie(movieId);
    movieDetails.querySelector("img").src = movie.img;
    movieDetails.querySelector("h1").textContent = "Movie title: "+ movie.title;
    movieDetails.querySelector("p").textContent = movie.description;

    const likesres = await fetch("http://localhost:3030/data/likes?where=movieId%3D%22"+movieId+"%22&distinct=_ownerId&count");
    const likes = await likesres.json();

    const allButtons = [...movieDetails.querySelectorAll("a")];
    if(checkIfOwner(movie)){
        movieDetails.querySelector("a").style.display = "inline-block";
        allButtons[0].style.display = "inline-block";
        allButtons[1].style.display = "inline-block";
        allButtons[2].style.display = "inline-block";
    }
    else{
        allButtons[2].style.display = "inline-block";
    }
    allButtons[0].id = movieId;
    allButtons[0].addEventListener("click", deleteMovie);
    movieDetails.querySelector("span").textContent = likes;
    const sections = [...document.querySelectorAll("section")];
    sections.forEach(section => {
        section.style.display = "none";
    }
    );
    document.getElementById("movie-example").style.display = "block";
}

async function deleteMovie(e){
    const movieId = e.target.id;
    const response = await fetch("http://localhost:3030/data/movies/" + movieId, {
        method: "delete",
        headers: {"Content-Type": "application/json", "X-Authorization": sessionStorage.accessToken}
    });
    if(!response.ok){
        throw new Error(response.message);
    }
    showHome();
}


export {showMovieDetailsPage};


// example of a movie details page below

{/* <section id="movie-example" class="view-section">
<div class="container">
  <div class="row bg-light text-dark">
    <h1>Movie title: Black Widow</h1>

    <div class="col-md-8">
      <img
        class="img-thumbnail"
        src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg"
        alt="Movie"
      />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>
        Natasha Romanoff aka Black Widow confronts the darker parts of
        her ledger when a dangerous conspiracy with ties to her past
        arises. Comes on the screens 2020.
      </p>
      <a class="btn btn-danger" href="#">Delete</a>
      <a class="btn btn-warning" href="#">Edit</a>
      <a class="btn btn-primary" href="#">Like</a>
      <span class="enrolled-span">Liked 1</span>
    </div>
  </div>
</div>
</section> */}