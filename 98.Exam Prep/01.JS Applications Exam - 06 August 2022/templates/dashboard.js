import { html, render } from "../node_modules/lit-html/lit-html.js";

export const jobOffers = (offer) => 
  html`
    <div class="offer">
      <img src="${offer.imageUrl}" alt="img" />
      <p><strong>Title: </strong><span class="title">${offer.title}</span></p>
      <p>
        <strong>Salary:</strong
        ><span class="salary">${offer.salary}</span>
      </p>
      <a class="details-btn" href="/details/${offer._id}">Details</a>
    </div>
  `;

export const noOffers = html `
    <h2>Job Offers</h2>
    <h2>No offers yet.</h2>
`

const template = html` <section id="dashboard"></section> `;

export function renderDashboard() {
  render(template, document.querySelector("main"));
}
