import { render, html } from "../node_modules/lit-html/lit-html.js";

const userNavTemplate = html`
  <nav>
    <section class="logo">
      <img src="./images/logo.png" alt="logo" />
    </section>
    <ul>
      <!--Users and Guest-->
      <li><a href="/">Home</a></li>
      <li><a href="/dashboard">Dashboard</a></li>
      <!--Only Users-->
      <li><a href="/create">Create Postcard</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </nav>
`;

const guestNavTemplate = html`
  <nav>
    <section class="logo">
      <img src="./images/logo.png" alt="logo" />
    </section>
    <ul>
      <!--Users and Guest-->
      <li><a href="/">Home</a></li>
      <li><a href="/dashboard">Dashboard</a></li>
      <!--Only Guest-->
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
    </ul>
  </nav>
`;

export function userNav() {
  render(userNavTemplate, document.querySelector("header"));
}

export function guestNav() {
  render(guestNavTemplate, document.querySelector("header"));
}
