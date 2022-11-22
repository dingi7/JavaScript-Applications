import { showView } from "./dom.js";
import { nav } from "./dom.js";
import { showHome } from "./home.js";

const section = document.getElementById("form-sign-up");

function showRegister(){
    section.remove();
    showView(section);
    const form = section.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        const rePass = formData.get("repeatPassword");
        if(password !== rePass){
            alert("Passwords don't match!");
            return;
        }
        if(!email || !password){
            alert("All fields are required!");
            return;
        }
        if(password.length < 6){
            alert("Password must be at least 6 characters long!");
            return;
        }
        register(email,password);
    });
}

async function register(email, password){
    const response = await fetch("http://localhost:3030/users/register",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email,password})
    });
    const data = await response.json();
    if(data.accessToken){
        sessionStorage.setItem("accessToken",data.accessToken);
        sessionStorage.setItem("email",data.email);
        sessionStorage.setItem("userId",data._id);
        nav();
        showHome();
    }
    else{
        alert(data.message);
        return;
    }
}

export {showRegister}