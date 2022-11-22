import {showHome}  from "./home.js";
import {showLogIn, logOut} from "./login.js";
import {showRegister} from "./register.js";
import { nav as navigation }  from "./dom.js";


document.getElementById("hidden").style.display = "none";
navigation()
const nav = document.querySelector("nav");
nav.addEventListener("click", (e) => {
    switch (e.target.textContent) {
        case "Movies":
            e.preventDefault()
            showHome();
            break;
        case "Login":
            e.preventDefault()
            showLogIn();
            break;
        case "Register":
            e.preventDefault()
            showRegister();
            break;
        case "Logout":
            e.preventDefault()
            logOut();
            break;
        default:
            break;
    }
});



// call home func 
showHome()

// - logIn page
// - register page
// - edit page
// - details page
// - create page
// - logout function