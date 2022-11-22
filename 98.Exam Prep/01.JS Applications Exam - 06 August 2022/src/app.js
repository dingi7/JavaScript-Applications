import page from '../node_modules/page/page.mjs'
import { renderHome } from '../templates/home.js'
import { guestNav, userNav } from '../templates/nav.js'
import { create } from './create.js'
import { dashboard } from './dashboard.js'
import { details } from './details.js'
import { login } from './login.js'
import { logout } from './logout.js'
import { register } from './register.js'

page('/', nav, renderHome)
page('/login', nav, login)
page('/register', nav, register)
page('/logout', logout)
page('/dashboard', nav, dashboard)
page('/create', nav, create)
page('/details/:id', nav, details)

page.start()

function nav(ctx,next){
    if(sessionStorage.authToken){
        userNav()
    }else{
        guestNav()
    }
    ctx.nav = nav
    next()
}