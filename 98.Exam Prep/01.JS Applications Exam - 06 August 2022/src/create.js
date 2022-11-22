import page from "../node_modules/page/page.mjs";
import { renderCreate } from "../templates/create.js";

export function create(ctx, next){
    renderCreate()
    document.querySelector('form').addEventListener('submit', onCreate)

    async function onCreate(e){
        e.preventDefault()
        const formdata = new FormData(e.target)
        const title = formdata.get('title')
        const imageUrl = formdata.get('imageUrl')
        const category = formdata.get('category')
        const description = formdata.get('description')
        const requirements = formdata.get('requirements')
        const salary = formdata.get('salary')
        if(!title || !imageUrl || !category || !description || !requirements || !salary){
            alert('All fields are required!')
            return;
        }
        try{
            await createReq(title,imageUrl,category,description,requirements,salary)
            page.redirect('/dashboard')
        }catch(err){
            alert(err)
        }
    }

    async function createReq(title,imageUrl,category,description,requirements,salary){
        const response = await fetch('http://localhost:3030/data/offers', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({title,imageUrl,category,description,requirements,salary})
        });
        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message)
        }
    }
}