import {html, render, nothing} from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById("root");
const input = document.getElementById("towns");

const form = document.querySelector("form");
form.addEventListener("submit", renderTowns);

function renderTowns(e) {
    e.preventDefault();
    const towns = input.value.split(", ");
    const template = (town) => html`<li>${town}</li>`;
    render(html`<ul>${towns.map(template)}</ul>`, root);
}