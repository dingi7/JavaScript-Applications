import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { editTemplate } from "../templates/edit.js";

export function renderEdit(title,img,category,description,requirements,salary, id){
    render(editTemplate(title,img,category,description,requirements,salary), document.querySelector('main'))
    document.querySelector('form').addEventListener('submit',async(e) =>{
        e.preventDefault()
        const formdata = new FormData(e.target)
        const titleN = formdata.get('title')
        const imgN = formdata.get('imageUrl')
        const categoryN = formdata.get('category')
        const descriptionN = formdata.get('description')
        const requirementsN = formdata.get('requirements')
        const salaryN = formdata.get('salary')
        if(!titleN || !imgN || !categoryN || !descriptionN || !requirementsN || !salaryN){
            alert('All fields are required!')
            return;
        }
        try{
            await edit(titleN,imgN,categoryN,descriptionN,requirementsN,salaryN, id)
            page.redirect('/details/' + id)
        }catch(err){
            alert(err)
        }
    })
}

async function edit(title,imageUrl,category,description,requirements,salary, id){
    const response = await fetch(`http://localhost:3030/data/offers/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json', 'X-Authorization': sessionStorage.getItem('authToken')},
        body: JSON.stringify({title,imageUrl,category,description,requirements,salary})
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    return data;
}