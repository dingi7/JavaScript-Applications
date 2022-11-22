import page from "../node_modules/page/page.mjs";

export function atachRegisterEvent(){
    document.querySelector('form').addEventListener('submit', onRegister)
    }

async function onRegister(e){
    e.preventDefault()
    const formdata = new FormData(e.target)
    const email = formdata.get('email')
    const password = formdata.get('password')
    const repasss = formdata.get('repeatPassword')
    if(!email || !password || !repasss || repasss != password){
        alert('Make sure to fill all fields correctly!')
        return;
    }
    try{
        await registerReq(email,password)
        page.redirect('/')
    }catch(err){
        alert(err)
    }
}

async function registerReq(email,password){
    const response = await fetch('http://localhost:3030/users/register', {
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