import { renderDashboard } from "./dashboard.js";
import page from "../node_modules/page/page.mjs";
import { renderLogin } from "./login.js";
import { renderRegister } from "./register.js";
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { renderCreate } from "./create.js";
import { renderDetails } from "./details.js";
import { renderMyPublications } from "./myPublications.js";

const userTemplate = html`
  <a id="catalogLink" href="/dashboard" class="active">Dashboard</a>
  <div id="user">
    <a id="createLink" href="/create">Create Furniture</a>
    <a id="profileLink" href="/myFurniture">My Publications</a>
    <a id="logoutBtn" href="/logout">Logout</a>
  </div>
`;
const guestTemplate = html`
  <a id="catalogLink" href="/dashboard" class="active">Dashboard</a>
  <div id="guest">
    <a id="loginLink" href="/login">Login</a>
    <a id="registerLink" href="/register">Register</a>
  </div>
`;

page("/", nav, renderDashboard);
page("/dashboard", nav, renderDashboard);
page("/login", nav, renderLogin);
page("/register", nav, renderRegister);
page("/logout", nav, logOut);
page('/create', nav, renderCreate)
page('/details/:id', nav, renderDetails)
page('/myFurniture', nav, renderMyPublications)

page.start();


function nav(ctx, next) {
  if (sessionStorage.authToken) {
    render(userTemplate, document.querySelector("nav"));
  } else {
    render(guestTemplate, document.querySelector("nav"));
  }
  [...document.querySelectorAll("nav a")].forEach((a) => {
    a.classList.remove("active");
    if (a.pathname == ctx.pathname) {
      a.classList.add("active");
    }
  });
  if (ctx.pathname == "/") {
    document.getElementById("catalogLink").classList.add("active");
  }
  ctx.nav = nav;
  next();
}

async function logOut(ctx, next) {
  await fetch("http://localhost:3030/users/logout", {
    method: "get",
    headers: { "X-Authorization": sessionStorage.getItem("authToken") },
  });
  page.redirect("/");
  ctx.nav(ctx, next);
  sessionStorage.clear();
}
