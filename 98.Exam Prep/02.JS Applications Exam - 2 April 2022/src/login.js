import page from "../node_modules/page/page.mjs";


export function atachLoginEvent(){
document.querySelector('form').addEventListener('submit', onLogin)
}

async function onLogin(e){
    e.preventDefault()
    const fromdata = new FormData(e.target)
    const email = fromdata.get('email');
    const password = fromdata.get('password');
    if(email == '' || password == ''){
        return alert('All fields are required!');
    }
    try{
        await loginReq(email, password)
        page.redirect('/')
    }catch(err){
        alert(err)
    }
}

async function loginReq(email,password){
    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    sessionStorage.setItem('authToken', data.accessToken);
    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('email', data.email);
}