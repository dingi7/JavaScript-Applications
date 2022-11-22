import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { renderEdit } from "./edit.js";

const template = (furniture) => html`
  <div class="container">
    <div class="row space-top">
      <div class="col-md-12">
        <h1>Furniture Details</h1>
      </div>
    </div>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <img src=".${furniture.img}" />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <p>Make: <span>${furniture.make}</span></p>
        <p>Model: <span>${furniture.model}</span></p>
        <p>Year: <span>${furniture.year}</span></p>
        <p>Description: <span>${furniture.description}</span></p>
        <p>Price: <span>${furniture.price}</span></p>
        <p>Material: <span>${furniture.material}</span></p>
        <div id="controls"></div>
      </div>
    </div>
  </div>
`;

export async function renderDetails(ctx, next) {
  const furniture = await getFurnitureById(ctx.params.id);
  const userId = sessionStorage.getItem("userId");
  const isOwner = userId == furniture._ownerId;
  render(template(furniture), document.querySelector("main"));
  if (isOwner) {
    render(
      html` 
        <a href="”#”" class="btn btn-info" @click=${onEdit.bind(null,furniture)}>Edit</a>
        <a href="”#”" class="btn btn-red" @click=${deleteFurniture.bind(null,furniture._id)}>Delete</a>`,
      document.querySelector("#controls")
    );
  }
}

async function getFurnitureById(id) {
  const response = await fetch("http://localhost:3030/data/catalog/" + id);
  const data = await response.json();
  return data;
}

async function deleteFurniture(id, e){
    e.preventDefault();
    const response = await fetch('http://localhost:3030/data/catalog/' + id, {
        method: 'delete',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        }
    });
    if(response.ok){
        page.redirect('/');
    } else {
        const error = await response.json();
        alert(error.message);
    }
}

async function onEdit(furniture, e){
    let {make, model, year, description, price, img, material, _id} = furniture;
    e.preventDefault()
    renderEdit(make, model, year, description, price, img, material, _id)
}