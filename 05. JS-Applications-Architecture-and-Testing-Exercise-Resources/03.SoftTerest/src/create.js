import { showSection, req } from "./api.js";

const section = document.getElementById("create-view");
section.remove();

export function showCreateView(ctx) {
    showSection(section);
    document.getElementById("create-sub").addEventListener("click", (e) => {
        e.preventDefault();
        create(ctx);
    });
}

async function create(ctx) {
    let title = document.getElementById("ideaTitle").value;
    let description = document.getElementById("ideaDescription").value;
    let img = document.getElementById("inputURL").value;
    if(title.length < 6){
        alert("Title must be at least 6 characters long!")
        return
    }
    if(description.length < 10){
        alert("Description must be at least 10 characters long!")
        return
    }
    if(img.length < 5){
        alert("Image URL must be at least 5 characters long!")
        return
    }
    try {
        await onCreate(title, description, img);
        title = "";
        description = "";
        img = "";
        ctx.goto("dash");
    } catch (err) {
        alert(err.message);
    }
}

async function onCreate(title, description, img) {
    const resp = await fetch("http://localhost:3030/data/ideas", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": sessionStorage.getItem("authToken"),
        },
        body: JSON.stringify({ title, description, img }),
    });
    if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.message);
    }
}

