import page from '../node_modules/page/page.mjs'
import { renderCreate } from '../templates/create.js'
import { renderDashboard } from '../templates/dashboard.js'
import { renderHome } from '../templates/home.js'
import { renderLogin } from '../templates/login.js'
import { guestNav, userNav } from '../templates/nav.js'
import { renderRegister } from '../templates/register.js'
import { atachCreateEvent } from './create.js'
import { initDashboard } from './dashboard.js'
import { details } from './details.js'
import { atachLoginEvent } from './login.js'
import { logout } from './logout.js'
import { atachRegisterEvent } from './registe.js'

page('/', nav, renderHome)
page('/login',nav,renderLogin, atachLoginEvent)
page('/register', nav, renderRegister, atachRegisterEvent)
page('/logout', logout)
page('/dashboard', nav, initDashboard, renderDashboard)
page('/create', nav, renderCreate, atachCreateEvent)
page('/details/:id', nav, details)

page.start()

function nav(ctx,next){
    if(sessionStorage.authToken){
        userNav()
    }else{
        guestNav()
    }
    ctx.nav = nav
    ctx.content = document.querySelector('main')
    next()
}