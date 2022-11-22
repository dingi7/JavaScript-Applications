import { html, render } from "../node_modules/lit-html/lit-html.js";

const dashBoardStatic = html`
  <section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard"></div>
  </section>
`;

const animalsTemplate = (animal) => html`
  <div class="animals-board">
    <article class="service-img">
      <img class="animal-image-cover" src="${animal.image}" />
    </article>
    <h2 class="name">${animal.name}</h2>
    <h3 class="breed">${animal.breed}</h3>
    <div class="action">
      <a class="btn" href="/details/${animal._id}">Details</a>
    </div>
  </div>
`;

const noAnimalTemplate = html` 
                <div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>
`

export function renderDashboard(ctx, next){
    render(dashBoardStatic, ctx.content)
    if(ctx.animals.length == 0){
        render(noAnimalTemplate, document.getElementsByClassName('animals-dashboard')[0])
    }else{
        render(ctx.animals.map(animalsTemplate), document.getElementsByClassName('animals-dashboard')[0])
    }
}