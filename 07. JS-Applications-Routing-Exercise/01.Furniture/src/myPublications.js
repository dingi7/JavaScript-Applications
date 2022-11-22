import { html, render } from "../node_modules/lit-html/lit-html.js";

const template = html`
  <div class="container">
    <div class="row space-top">
      <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
      </div>
    </div>
    <div class="row space-top"></div>
  </div>
`;

const templateFurn = (furniture) => html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${furniture.img}" />
                            <p>${furniture.description}</p>
                            <footer>
                                <p>Price: <span>${furniture.price} $</span></p>
                            </footer>
                            <div>
                                <a href=/details/${furniture._id} class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
`;


export async function renderMyPublications(ctx, next) {
  const furnitures = await getFurniture();
  render(template, document.querySelector("main"));
  render(
    furnitures.map(templateFurn),
    document.querySelector(".row.space-top")
  );
}

async function getFurniture() {
  const userId = sessionStorage.getItem("userId");
  const response = await fetch(
    `http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

