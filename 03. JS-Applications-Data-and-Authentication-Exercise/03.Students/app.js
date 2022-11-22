
const url = `http://localhost:3030/jsonstore/collections/students`
const tBody = document.querySelector("#results tbody");
const form = document.getElementById("form")
const submit = document.getElementById("submit")
window.onload = load
submit.addEventListener("click", createStudent)

async function load(){
    tBody.replaceChildren()
    const response = await fetch(url)
    const data = await response.json() 
    Object.entries(data).forEach(e =>{
        let tr = HtmlGen("tr", "", tBody)
        HtmlGen("td", e[1].firstName, tr)
        HtmlGen("td", e[1].lastName, tr)
        HtmlGen("td", e[1].facultyNumber, tr)
        HtmlGen("td", e[1].grade, tr)
    })
}

async function createStudent(e){
    e.preventDefault()
    const formData = new FormData(form)
    const {firstName, lastName, facultyNumber, grade} = Object.fromEntries(formData.entries())
    if(!firstName || !lastName || !facultyNumber || !grade) { return}
    await fetch(url, {
        method: "post",
        body: JSON.stringify({
            firstName, lastName, facultyNumber, grade
        })
    })
    load()
}

function HtmlGen(name,text,parent){
    let el = document.createElement(name)
    el.textContent = text
    if(parent){
        parent.appendChild(el)
    }
    return el
}