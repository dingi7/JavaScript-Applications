const ulEl = document.getElementById("phonebook")
const baseUrl = `http://localhost:3030/jsonstore/phonebook`
const loadBtn = document.getElementById("btnLoad")
const createBtn = document.getElementById("btnCreate")
const person = document.getElementById("person")
const phone = document.getElementById('phone')

function attachEvents() {
    loadBtn.addEventListener("click", load)
    createBtn.addEventListener("click", create)
}

async function load(){
    const phonebook = document.querySelector('#phonebook');
    phonebook.replaceChildren()
    const response = await fetch(baseUrl)
    const data = await response.json()

    Object.values(data).forEach(x => {
        let li = htmlGen('li', `${x.person}: ${x.phone}`, phonebook);
        let deleteBtn = htmlGen('button', 'Delete', li);
        deleteBtn.setAttribute('id', x._id);
        deleteBtn.addEventListener('click', (e) => deletePhone(e));
    })
}

async function create(){
    if(!person.value || !phone.value){return}
    await fetch(baseUrl,{
        method:"post",
        body:JSON.stringify({
            "person": person.value,
            "phone": phone.value
        })
    })
    load()
    person.value = ""
    phone.value = ""
}

async function deletePhone(e) {

    let id = e.target.getAttribute('id');
    e.target.parentNode.remove();

    await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });
}

function htmlGen(name, text, parent){
    let el = document.createElement(name);
    el.textContent = text;

    if (parent) {
        parent.appendChild(el);
    }
    return el;
}

attachEvents();
