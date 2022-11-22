import { showView } from "./dom.js";
import { showCorrectDetails } from "./details.js";
const section = document.getElementById("edit-movie");

async function showEdit(title,description,img,id){
    section.remove();
    section.querySelectorAll("input")[0].value = title;
    section.querySelectorAll("textarea")[0].value = description;
    section.querySelectorAll("input")[1].value = img;
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
        section.querySelector("button").textContent = "Editing...";
        await editMovie(title,description,img,id);
        form.reset()
        section.querySelector("button").textContent = "Save Changes";
        showCorrectDetails(id);
    });
}

async function editMovie(title,description,img,id){
    const response = await fetch("http://localhost:3030/data/movies/"+id,{
        method: "PUT",
        headers: {"Content-Type": "application/json","X-Authorization": sessionStorage.getItem("accessToken")},
        body: JSON.stringify({title,description,img})
    });
    const data = await response.json();
    if(!response.ok){
        alert(data.message);
        throw new Error(data.message);
    }
}

export {showEdit}