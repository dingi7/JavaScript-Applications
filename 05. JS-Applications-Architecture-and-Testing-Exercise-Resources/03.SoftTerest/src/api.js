const nav = document.querySelector("nav");

export function showSection(section){
    document.querySelector("main").replaceChildren(section)
}

export async function req(method, url, headers, body){
    if(!headers){
        headers ={
            "Content-Type": "application/json"
        }
    }
    let payLoad = 
    {    
            method: method,
            headers: headers,
    }
    if(body){
        payLoad.body = body
    }
    const response = await fetch(url,payLoad)
    const data = await response.json()
    if(!response.ok){
        console.log(data)
        throw new Error(data.message)
    }
    return data
}

export function navView(){
    if(sessionStorage.authToken){
        document.getElementById("img").style.display = "inline-block"
        document.getElementById("dash").style.display = "inline-block"
        document.getElementById("create").style.display = "inline-block"
        document.getElementById("logout").style.display = "inline-block"
        document.getElementById("login").style.display = "none"
        document.getElementById("register").style.display = "none"
    }else{
        document.getElementById("img").style.display = "inline-block"
        document.getElementById("dash").style.display = "inline-block"
        document.getElementById("create").style.display = "none"
        document.getElementById("logout").style.display = "none"
        document.getElementById("login").style.display = "inline-block"
        document.getElementById("register").style.display = "inline-block"
    }
}