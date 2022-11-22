import { showView } from "./dom.js";
import { showHome } from "./home.js";


const section = document.getElementById("add-movie");

function showCreate(){
    section.remove();
    showView(section);
    const form = section.querySelector("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get("title");
        const description = formData.get("description");
        const img = formData.get("img");
        if(!title || !description || !img){
            alert("All fields are required!");
            return;
        }
        section.querySelector("button").textContent = "Creating...";
        await createMovie(title,description,img);
        form.reset()
        section.querySelector("button").textContent = "Submit";
        showHome();
    });
}

async function createMovie(title,description,img){
    const response = await fetch("http://localhost:3030/data/movies",{
        method: "POST",
        headers: {"Content-Type": "application/json","X-Authorization": sessionStorage.getItem("accessToken")},
        body: JSON.stringify({title,description,img})
    });
    const data = await response.json();
    if(!response.ok){
        alert(data.message);
        throw new Error(data.message);
    }
}


export {showCreate}