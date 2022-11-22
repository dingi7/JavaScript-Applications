import {showHome} from './home.js';

function showAddPage(){
    // show all sections except the add-movie section
    const sections = [...document.querySelectorAll('section')];
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('add-movie').style.display = 'block';
    document.getElementById('add-movie-form').addEventListener('submit',onAddMovie);
}

async function onAddMovie(e){
    e.preventDefault();
    try{
        await addMovie();
        showHome();
    }
    catch(err){
        alert(err.message);
    }
}

async function addMovie(){
    const form = document.getElementById('add-movie-form');
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');
    if(title == '' || description == '' || img == ''){
        throw new Error('All fields are required!');
    }
    const response = await fetch('http://localhost:3030/data/movies',{
        method: 'post',
        headers: {'Content-Type': 'application/json','X-Authorization': sessionStorage.getItem('accessToken')},
        body: JSON.stringify({title,description,img})
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    form.reset();
}

export {showAddPage};