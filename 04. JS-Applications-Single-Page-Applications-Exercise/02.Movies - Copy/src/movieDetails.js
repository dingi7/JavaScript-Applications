import { fixNav } from "./navigation.js";
import { onLike, getMovieLikes, isLiked } from "./likeMovie.js";
import { onEditMovie } from "./editMovie.js";

async function showDetailsPage(e, id) {
  if (!sessionStorage.getItem("accessToken")) {return;}
  fixNav();
  let movieId = ""
  if (e) {
    movieId = e.target.id;
  } else {
    movieId = id;
  }
  const movie = await getMovieDetails(movieId);
  const sections = [...document.querySelectorAll("section")];
  sections.forEach((section) => {
    section.style.display = "none";
  });
  const movieSection = document.getElementById("movie-example");
  movieSection.style.display = "block";
  const movieLikes = movieSection.querySelector("span");
  const allButtons = [...movieSection.querySelectorAll("a")];
  if (sessionStorage.userId == movie._ownerId) {
    allButtons[0].style.display = "inline-block";
    allButtons[1].style.display = "inline-block";
    allButtons[2].style.display = "none";
    movieLikes.style.display = "inline-block";
  } else {
    allButtons[0].style.display = "none";
    allButtons[1].style.display = "none";
    allButtons[2].style.display = "inline-block";
    movieLikes.style.display = "none";
    console.log(movieId)
    if(await isLiked(movieId, sessionStorage.userId)){
      allButtons[2].textContent = "Liked " + movieLikes.textContent;
    }
  }
  const likes = await getMovieLikes(movieId);
  const movieTitle = movieSection.querySelector("h1");
  movieTitle.textContent = movie.title;
  const movieImg = movieSection.querySelector("img");
  movieImg.src = movie.img;
  const movieDescription = movieSection.querySelector("p");
  movieDescription.textContent = movie.description;

  movieLikes.textContent = likes;

  allButtons[0].addEventListener("click", async (e) => {
    e.preventDefault();
    await onDeleteMovie(movieId);
  });
// here
  allButtons[1].addEventListener("click", async (e) => {
    e.preventDefault();
    await onEditMovie(movie.title, movie.description, movie.img, movieId);
  });

  allButtons[2].addEventListener("click", async (e) => {
    // error couting likes
    e.preventDefault();
    if(allButtons[2].textContent === "Like"){
      await onLike(movieId);
      allButtons[2].textContent = "Liked " + movieLikes.textContent;
    }
    else{
      // await revokeLike(movieId, sessionStorage.userId);
      allButtons[2].textContent = "Like";
    }
  });
    
}

async function getMovieDetails(id) {
  const response = await fetch("http://localhost:3030/data/movies/" + id);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

// async function getMovieLikes(id) {
//   const response = await fetch(
//     `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`
//   );
//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message);
//   }
//   return data;
// }

// async function onLike(id) {
//   try {
//     await likeMovie(id);
//     return true;
//   } catch (err) {
//     alert(err.message);
//   }
// }

// async function likeMovie(id) {
//   const response = await fetch("http://localhost:3030/data/likes", {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Authorization": sessionStorage.getItem("accessToken"),
//     },
//     body: JSON.stringify({ movieId: id }),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message);
//   }
//   return data;
// }

// async function onDeleteMovie(id) {
//   try {
//     await deleteMovie(id);
//     showHome();
//   } catch (err) {
//     alert(err.message);
//   }
// }

// async function deleteMovie(id) {
//   const response = await fetch("http://localhost:3030/data/movies/" + id, {
//     method: "delete",
//     headers: { "X-Authorization": sessionStorage.getItem("accessToken") },
//   });

//   if (!response.ok) {
//     const data = await response.json();
//     throw new Error(data.message);
//   }
// }

// async function onEditMovie(title, description, img, id) {
//   const editMovieSection = document.getElementById("edit-movie");
//   const form = document.getElementsByClassName(
//     "text-center border border-light p-5"
//   )[1];
//   const formData = new FormData(form);
//   editMovieSection.getElementsByTagName("input")[0].value = title;
//   editMovieSection.getElementsByTagName("textarea")[0].value = description;
//   editMovieSection.getElementsByTagName("input")[1].value = img;
//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const img = formData.get("img");
//     if (title == "" || description == "" || img == "") {
//       return alert("All fields are required!");
//     }
//     try {
//       await editMovie(title, description, img, id);
//       showDetailsPage(undefined, id);
//     } catch (err) {
//       alert(err.message);
//     }
//   });
//   // hide all sections expect edit-movie
//   const sections = [...document.querySelectorAll("section")];
//   sections.forEach((section) => {
//     section.style.display = "none";
//   });

//   editMovieSection.style.display = "block";
// }
// async function editMovie(title, description, img, id) {
//   const response = await fetch("http://localhost:3030/data/movies/" + id, {
//     method: "put",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Authorization": sessionStorage.getItem("accessToken"),
//     },
//     body: JSON.stringify({ title, description, img }),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message);
//   }
//   return data;
// }

export { showDetailsPage };
