import { showHome } from "./home.js";
import { showLogIn, logOut } from "./login.js";
import { showRegister } from "./register.js";

const userElements = document.getElementsByClassName("nav-item user");
const guestElements = document.getElementsByClassName("nav-item guest");
// const movieLink = document.getElementsByClassName("navbar-brand text-light");

const nav = document.querySelector("#nav");
nav.addEventListener("click", (e) => {
    switch (e.target.textContent) {
        case "Movies":
            showHome();
            break;
        case "Login":
            showLogIn();
            break;
        case "Register":
            showRegister();

            break;
        case "Logout":
            logOut();
            break;
        default:
            break;
    }
});
// movieLink[0].addEventListener("click", showHome)
// userElements[1].addEventListener("click", logOut)
// guestElements[0].addEventListener("click", showLogIn)
// guestElements[1].addEventListener("click", showRegister)

function fixNav(){
    const welcomeMsg = document.getElementById('welcome-msg');
    if(sessionStorage.accessToken){
        [...userElements].forEach(el => el.style.display = "block");
        welcomeMsg.textContent = `Welcome, ${sessionStorage.email}`;
        [...guestElements].forEach(el => el.style.display = "none");
    }
    else{
        [...userElements].forEach(el => el.style.display = "none");
        [...guestElements].forEach(el => el.style.display = "block");
    }
}
export {fixNav};