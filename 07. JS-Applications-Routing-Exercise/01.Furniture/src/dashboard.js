import { html, render } from '../node_modules/lit-html/lit-html.js';

const loading = html`
<img src="./images/Chunk-4s-200px.gif"/>`
// center the img src

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

const template = html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
        </div>
    </div>
    `

export async function renderDashboard(ctx, next) {
    render(template, document.querySelector('main'));
    render(loading, document.querySelector('.row.space-top'));
    const furnitures = await getFurniture();

    render(furnitures.map(templateFurn), document.querySelector('.row.space-top'));
}

async function getFurniture(){
    const response = await fetch('http://localhost:3030/data/catalog');
    const data = await response.json();
    return data;
}