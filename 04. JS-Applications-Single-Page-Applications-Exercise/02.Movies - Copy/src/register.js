// show registerPage
// send register request
// show HomePage
import {fixNav} from './navigation.js';
import {showHome} from './home.js';

function showRegister(e){
    e.preventDefault();
    fixNav();
    const sections = [...document.querySelectorAll('section')];
    sections.forEach(section => {
        section.style.display = 'none';
    }
    );
    document.getElementById('form-sign-up').style.display = 'block';
    document.getElementById('register-form').addEventListener('submit', register);
}

async function register(e){
    e.preventDefault();
    try{
        await onRegister();
        showHome();
    }
    catch(err){
        alert(err.message);
    }
}

async function onRegister(){
    const form = document.getElementById('register-form');
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword');
    if(password.length < 6){
        throw new Error('Password must be at least 6 characters long!');
    }
    if(!email || !password|| !rePass){
        throw new Error('All fields are required!');
    }
    if(password !== rePass){
        throw new Error('Passwords don\'t match!');
    }
    const response = await fetch('http://localhost:3030/users/register',{
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

export {showRegister};