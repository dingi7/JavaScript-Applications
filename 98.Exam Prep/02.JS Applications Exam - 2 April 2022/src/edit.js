import { html, render } from "../node_modules/lit-html/lit-html.js";
import { editTemplate } from '../templates/edit.js'
import page from '../node_modules/page/page.mjs'

export function renderEdit(name, breed, age, weight, image, id){
    render(editTemplate(name, breed, age, weight, image), document.querySelector('main'))
    document.querySelector('form').addEventListener('submit', (e) =>{
        e.preventDefault()
        const formdata = new FormData(e.target)
        const name = formdata.get('name')
        const breed = formdata.get('breed')
        const age = formdata.get('age')
        const weight = formdata.get('weight')
        const image = formdata.get('image')
        if(!name || !breed || !age || !weight || !image){
            alert('All fields are required!')
            return;
        }
        try{
            editReq(name,breed,age,weight,image, id)
            page.redirect('/details/' + id)
        }catch(err){
            alert(err)
        }
    })
}

async function editReq(name,breed,age,weight,image, id){
    const response = await fetch(`http://localhost:3030/data/pets/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json', 'X-Authorization': sessionStorage.getItem('authToken')},
        body: JSON.stringify({name,breed,age,weight,image})
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    return data;
}
