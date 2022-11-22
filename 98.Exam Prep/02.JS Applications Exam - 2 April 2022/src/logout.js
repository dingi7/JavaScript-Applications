import page from '../node_modules/page/page.mjs'

export async function logout(){
    const token = sessionStorage.getItem('authToken')
    sessionStorage.clear()
    page.redirect('/')
    await fetch("http://localhost:3030/users/logout", {
        method: "get",
        headers: { "X-Authorization": token },
    });
}