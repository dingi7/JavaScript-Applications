import { showView } from "./dom.js";
import { showHome } from "./home.js";
import { showEdit } from "./edit.js";
import { getMovieLikes, isUserLiked, like } from "./likes.js";

const section = document.getElementById("movie-example");

async function showDetails(e) {
    
    e.preventDefault();
    // if(!sessionStorage.getItem("accessToken")){
    //     return alert("You must be logged in to view this page");
    // }
    section.remove();

    const id = e.target.id;
    await showCorrectDetails(id);
    showView(section);
}

async function showCorrectDetails(id){
    const response = await fetch("http://localhost:3030/data/movies/" + id);
    const data = await response.json();
    if(!response.ok){
        alert(data.message);
        throw new Error(data.message);
    }
    const title = section.querySelector("h1");
    const img = section.querySelector("img");
    const description = section.querySelector("p");
    const likes = section.querySelector("span");
    likes.textContent = "Liked " + await getMovieLikes(id);
    const deleteBtn = section.querySelectorAll("a")[0];
    const editBtn = section.querySelectorAll("a")[1];
    const likeBtn = section.querySelectorAll("a")[2];
    if(data._ownerId == sessionStorage.getItem("userId")){
        deleteBtn.style.display = "inline-block";
        editBtn.style.display = "inline-block";
        likeBtn.style.display = "none";
        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            deleteMovie(id);
        });
        editBtn.addEventListener("click", (e) => {
            e.preventDefault();
            showEdit(data.title, data.description, data.img, id);
        });
    }
    else{
        deleteBtn.style.display = "none";
        editBtn.style.display = "none";
        likes.style.display = 'none'
        likes.style.display = "inline-block";
        if(await isUserLiked(id, sessionStorage.getItem("userId")) >= 1){
            likeBtn.style.display = "none";
        }else{
        likeBtn.style.display = "inline-block";
        likeBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            await like(id);
            likeBtn.style.display = "none";
            likes.textContent = "Liked " + await getMovieLikes(id);
            likes.style.display = "inline-block";

        });}


    }
    title.textContent = "Movie title: " + data.title;
    img.src = data.img;
    description.textContent = data.description;
}

async function deleteMovie(id){
    const response = await fetch("http://localhost:3030/data/movies/" + id,{
        method: "DELETE",
        headers: {"X-Authorization": sessionStorage.getItem("accessToken")}
    });
    if(!response.ok){
        const data = await response.json();
        alert(data.message);
        throw new Error(data.message);
    }
    showHome()
}

export { showDetails, showCorrectDetails }