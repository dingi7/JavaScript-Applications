import { showHome } from "./home.js";

async function addMovie(e){
    e.preventDefault();
    const form = document.getElementById("add-movie-form");
    const formData = new FormData(form);
    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("img");
    const response = await fetch("http://localhost:3030/data/movies", {
        method: "post",
        headers: {"Content-Type": "application/json", "X-Authorization": sessionStorage.accessToken},
        body: JSON.stringify({title, description, img})
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    showHome()
}

function showAddMoviePage(){
    const sections = [...document.querySelectorAll("section")];
    sections.forEach(section => {
        section.style.display = "none";
    });
    document.getElementById("add-movie").style.display = "block";
    document.getElementById("add-movie-form").addEventListener("submit", addMovie);
}

export {showAddMoviePage};