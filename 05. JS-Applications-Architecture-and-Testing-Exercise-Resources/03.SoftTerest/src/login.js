import { showSection, req  } from "./api.js";

// register event listeners to navigation
// switch view
// handle form submit
// send login information to REST service
// store authorization token


const section = document.getElementById("login-view")
section.remove()



export function showLoginView(ctx) {
    showSection(section)
    document.getElementById("login-sub").addEventListener("click", async(e) => {
        e.preventDefault()
        await login(ctx)
    })
}

async function login(ctx){
    const email = document.getElementById("inputEmail").value
    const password = document.getElementById("inputPassword").value
    try{
        await onLogin(email,password)
    }
    catch(err){
        alert(err.message)
    }
    ctx.goto("dash")
}

async function onLogin(email,password){
    const data = await req("post", "http://localhost:3030/users/login", undefined, JSON.stringify({email,password}))
    sessionStorage.setItem("authToken", data.accessToken)
    sessionStorage.setItem("userId", data._id)
    sessionStorage.setItem("email", data.email)
}