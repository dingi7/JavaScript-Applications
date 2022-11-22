import {showHome} from "./home.js";
import {showLogInPage, showRegisterPage, logOut} from "./auth.js";
import { showAddMoviePage } from "./addMovie.js";

const ankers = [...document.getElementById("container").querySelectorAll("a")];
ankers[0].addEventListener("click", showHome);
ankers[2].addEventListener("click", logOut);
ankers[3].addEventListener("click", showLogInPage);
ankers[4].addEventListener("click", showRegisterPage);
ankers[5].addEventListener("click", showAddMoviePage);

function fixNav(){
    ankers.forEach(ank => {
        ank.style.display = "none";
    });
    if(!sessionStorage.accessToken){
        ankers[0].style.display = "inline-block";
        ankers[1].style.display = "none";
        ankers[3].style.display = "inline-block";
        ankers[4].style.display = "inline-block";
    }
    else{
        ankers[2].style.display = "inline-block";
        ankers[0].style.display = "inline-block";
        ankers[1].style.display = "inline-block";
        ankers[1].textContent = "Welcome, " + sessionStorage.getItem("email");
    }
    ankers[5].style.display = "inline-block";
}

// function showLogInPage(e){
//     e.preventDefault();
    
// }



export {fixNav};