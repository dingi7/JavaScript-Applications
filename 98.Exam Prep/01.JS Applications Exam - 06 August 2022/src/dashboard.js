import {html, render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { jobOffers, noOffers, renderDashboard } from '../templates/dashboard.js'

export async function dashboard(ctx,next){
    renderDashboard()

    const offers = await getOffers()
    if(offers.length == 0){
        render(noOffers, document.querySelector('section'))
    }else{
        render(html`<h2>Job Offers</h2>${offers.map(jobOffers)}`, document.querySelector('section'))
    }

    async function getOffers(){
        const response = await fetch(`http://localhost:3030/data/offers?sortBy=_createdOn%20desc`)
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message)
        }
        return data;
    }
}