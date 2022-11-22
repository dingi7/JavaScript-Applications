// show LogInPage
// send login request
// show HomePage
import {fixNav} from './navigation.js';
import {showHome} from './home.js';

function showLogIn(){
    fixNav();
    const sections = [...document.querySelectorAll('section')];
    sections.forEach(section => {
        section.style.display = 'none';
    }
    );
    document.getElementById('form-login').style.display = 'block';
    document.getElementById('login-form').addEventListener('submit', logIn);
}

async function logIn(e){
    e.preventDefault();
    try{
        await onLogIn();
        showHome();
    }
    catch(err){
        alert(err.message);
    }
}

async function onLogIn(){
    const form = document.getElementById('login-form');
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    if(email == '' || password == ''){
        throw new Error('All fields are required!');
    }

    const response = await fetch('http://localhost:3030/users/login',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    form.reset();
    sessionStorage.setItem('accessToken',data.accessToken);
    sessionStorage.setItem('userId',data._id);
    sessionStorage.setItem('email',data.email);
}

async function logOut(){
    const response = await fetch('http://localhost:3030/users/logout',{
        method: 'get',
        headers: {'X-Authorization': sessionStorage.getItem('accessToken')}
    });
    if(!response.ok){
        const data = await response.json();
        throw new Error(data.message);
    }
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    showLogIn();
}

export {showLogIn, logOut};