import { showSection, req  } from "./api.js";

// register event listeners to navigation
// switch view
// handle form submit
// send login information to REST service
// store authorization token


const section = document.getElementById("register-view")
section.remove()



export function showRegisterView(ctx) {
    showSection(section)
    document.getElementById("register-sub").addEventListener("click", async(e) => {
        e.preventDefault()
        await register(ctx)
    })
}

async function register(ctx){
const email = document.getElementById("email").value
const password = document.getElementById("password").value
const repassword = document.getElementById("inputRepeatPassword").value
if(password != repassword){
    alert("Passwords don't match")
    return
}
if(password.length < 3){
    alert("Password must be at least 3 characters long")
    return
}
if(email.length < 3){
    alert("Email must be at least 3 characters long")
    return
}
try{
    await onRegister(email,password)
}
catch(err){
    alert(err.message)
}
ctx.goto("dash")
}

async function onRegister(email,password){
const data = await req("post", "http://localhost:3030/users/register", undefined, JSON.stringify({email,password}))
sessionStorage.setItem("authToken", data.accessToken)
sessionStorage.setItem("userId", data._id)
sessionStorage.setItem("email", data.email)
}