import { navView } from "./api.js";
import { showCreateView } from "./create.js";
import { showDashboardView } from "./dashboard.js";
import { showHomeView } from "./home.js";
import { showLoginView } from "./login.js"
import { showRegisterView } from "./register.js";
import { showDetailsView } from "./details.js";

const nav = document.querySelector("nav")
nav.addEventListener("click", handleNav)
navView()


const views = {
    "login": showLoginView,
    "register": showRegisterView,
    "dash": showDashboardView,
    "create": showCreateView,
    "logout": logOut,
    "img": showHomeView,
    "home": showHomeView,
    "details": showDetailsView,
}

goto("home")

function handleNav(e){

    if(e.target.tagName == "A" || e.target.tagName == "IMG"){
        const id = e.target.id;
        if(goto(id)){
            e.preventDefault()
        }
    }
}



function goto(viewName, ...params){
    // debugger;
    const view = views[viewName]
    if(typeof view == 'function'){
        view({
            goto,
            params
        })
        navView()
        return true
    }
    return false
}

async function logOut(){
    await fetch("http://localhost:3030/users/logout", {
        method: "get",
        headers: {
            "X-Authorization": sessionStorage.getItem("authToken")
        }
    })
    sessionStorage.clear()
    goto("home")
}