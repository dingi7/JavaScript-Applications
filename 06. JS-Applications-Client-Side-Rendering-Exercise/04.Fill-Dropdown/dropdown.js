import {html, render} from './node_modules/lit-html/lit-html.js';

document.querySelector("form").addEventListener("submit", addItem);

async function addItem(e) {
    e.preventDefault();
    const input = document.getElementById('itemText');
    const value = input.value;
    try{
        await postEntry({text:value});
        loadPage();
    } catch (err) {
        console.error(err);
    }
}

async function postEntry(data){
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(!response.ok){throw new Error(response.statusText);}
}

async function getEntries(){
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    const entries = await response.json();
    return entries;
}

async function loadPage(){
    const root = document.getElementById('menu')
    const entries = await getEntries();
    const template = (data) => html`<option value="${data._id}">${data.text}</option>`
    render(html`${Object.values(entries).map(template)}`, root);
}

window.onload = () => loadPage();