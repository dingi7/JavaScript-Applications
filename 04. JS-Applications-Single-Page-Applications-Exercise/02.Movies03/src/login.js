import { showView } from "./dom.js";
import { showHome } from "./home.js";
import { nav } from "./dom.js";

const section = document.getElementById("form-login");

function showLogIn(){
    nav()
    section.remove();
    showView(section);
    const form = section.querySelector("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        if(!email || !password){
            alert("All fields are required!");
            return;
        }
        section.querySelector("button").textContent = "Loggin in...";
        try{
        await logIn(email,password);}catch(err){
            console.log(err);
        }
        finally{
            section.querySelector("button").textContent = "Login";
        }
    });
}

async function logIn(email, password){
    const response = await fetch("http://localhost:3030/users/login",{
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
        throw new Error(data.message);
    }
}

async function logOut(){

    const respone = await fetch("http://localhost:3030/users/logout",{
        method: "GET",
        headers: {"X-Authorization": sessionStorage.getItem("accessToken")}
    });
    if(!respone.ok){
        alert("Something went wrong!");
        return;
    }
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userId");
    nav();
    showLogIn();

}
export {showLogIn, logOut}