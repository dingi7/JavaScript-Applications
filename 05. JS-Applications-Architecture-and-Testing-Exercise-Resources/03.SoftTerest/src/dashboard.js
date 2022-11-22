import { showSection, req } from "./api.js";

const section = document.getElementById("dashboard-holder");
section.remove();

export async function showDashboardView(ctx) {
  section.innerHTML = "";
  const data = await req(
    "get",
    "http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc"
  );
  if (data.length == 0) {
    section.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
  } else {
    section.innerHTML = "";
    data.forEach((x) => {
      let div = document.createElement("div");
      div.className = "card overflow-hidden current-card details";
      div.style.width = "20rem";
      div.style.height = "18rem";
      div.innerHTML = `
        <div class="card-body">
        <p class="card-text">${x.title}</p>
        </div>
        <img class="card-image" src="${x.img}" alt="Card image cap">
        `;
        let a = document.createElement("a");
        a.classList.add("btn");
        a.href = '';
        a.id = x._id;
        a.textContent = "Details";
        a.addEventListener("click", (e) => {
            e.preventDefault();
            const id = e.target.id;
            ctx.goto("details", id);
        });
        div.appendChild(a);
      section.appendChild(div);
    });
  }
  showSection(section);
}
