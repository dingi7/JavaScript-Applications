import page from '../node_modules/page/page.mjs'

export function atachCreateEvent(){
    document.querySelector('form').addEventListener('submit', onCreate)
}

async function onCreate(e){
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
        await createReq(name,breed,age,weight,image)
        page.redirect('/')
    }catch(err){
        alert(err)
    }
}

async function createReq(name,breed,age,weight,image){
    const response = await fetch('http://localhost:3030/data/pets', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify({name,breed,age,weight,image})
    });
    if(!response.ok){
        const error = await response.json();
        throw new Error(error.message)
    }
}