import {showHome} from "./home.js";
import {fixNav} from "./navbar.js";

document.getElementById("login-form").addEventListener("submit", onLogIn);
document.getElementById("register-form").addEventListener("submit", onRegister);

async function onLogIn(e){
    e.preventDefault();
    try{await logIn()
    showHome();
    }
    catch(err){
        alert(err.message);
    }
}

async function onRegister(e){
    e.preventDefault();
    try{await register()
    showHome();
    }
    catch(err){
        alert(err.message);
    }
}


async function logIn(){
    const form = document.getElementById("login-form");
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await fetch("http://localhost:3030/users/login", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message);
    }
    sessionStorage.setItem("accessToken", data.accessToken);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("userId", data._id);
}

function showLogInPage(){
    fixNav()
    const sections = [...document.querySelectorAll("section")];
    sections.forEach(section => {
        section.style.display = "none";
    });
    document.getElementById("form-login").style.display = "block";

}



function showRegisterPage(){
    const sections = [...document.querySelectorAll("section")];
    sections.forEach(section => {
        section.style.display = "none";
    });
    document.getElementById("form-sign-up").style.display = "block";
}

async function register(){
    const form = document.getElementById("register-form");
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const rePass = formData.get("repeatPassword");
    if(password !== rePass){
        throw new Error("Passwords don't match!");
    }
    const response = await fetch("http://localhost:3030/users/register", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    sessionStorage.setItem("accessToken", data.accessToken);
    sessionStorage.setItem("email", data.email);
    sessionStorage.setItem("userId", data._id);
}

async function logOut(){
    const response = await fetch("http://localhost:3030/users/logout", {
        method: "get",
        headers: {"X-Authorization": sessionStorage.getItem("accessToken")}
    });
    sessionStorage.clear();
    showLogInPage();
    if(!response.ok){
        const data = await response.json();
        throw new Error(data.message);
    }

}

export {showLogInPage, showRegisterPage, logOut};