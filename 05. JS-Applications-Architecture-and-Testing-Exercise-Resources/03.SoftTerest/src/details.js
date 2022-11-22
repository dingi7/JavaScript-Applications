import { showSection, req } from "./api.js";

const section = document.getElementById("details-view");
section.remove();

export async function showDetailsView(ctx) {
    const id = ctx.params[0];
    console.log(id)
    const res = await fetch("http://localhost:3030/data/ideas/" + id);
    const data = await res.json();
    section.innerHTML = `
    <img class="det-img" src="${data.img}" />
    <div class="desc">
        <h2 class="display-5">${data.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${data.description}</p>
    </div>`;
    if(data._ownerId == sessionStorage.getItem("userId")){
        let div = document.createElement("div");
        div.classList.add("text-center");
        let a = document.createElement("a");
        a.classList = "btn detb";
        a.href = '';
        a.id = data._id;
        a.textContent = "Delete";
        div.appendChild(a);
        section.appendChild(div);
        a.addEventListener("click", async (e) => {
            e.preventDefault();
            const id = e.target.id;
            try{
            await onDelete(id);
            ctx.goto("dash");}
            catch(err){
                alert(err.message);
            }
        });
    }
    showSection(section);
}

async function onDelete(id) {
    const resp = await fetch("http://localhost:3030/data/ideas/" + id, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": sessionStorage.getItem("authToken"),
        },
    });
    if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.message);
    }
}
