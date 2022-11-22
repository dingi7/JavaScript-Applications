import { render, html } from "../node_modules/lit-html/lit-html.js";

const userNavTemplate = html`
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt="" /></a>
  <nav>
    <div>
      <a href="/dashboard">Dashboard</a>
    </div>
    <!-- Logged-in users -->
    <div class="user">
      <a href="/create">Create Offer</a>
      <a href="/logout">Logout</a>
    </div>
  </nav>
`;

const guestNavTemplate = html`
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt="" /></a>
  <nav>
    <div>
      <a href="/dashboard">Dashboard</a>
    </div>
    <div class="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  </nav>
`;

export function userNav() {
  render(userNavTemplate, document.querySelector("header"));
}

export function guestNav() {
  render(guestNavTemplate, document.querySelector("header"));
}
