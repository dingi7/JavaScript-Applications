import { html, render } from "./node_modules/lit-html/lit-html.js";

console.log("My requests...");

window.onload = () => {
  init();
    document.getElementById("loadBooks").addEventListener("click", displayBooks);
};

const templateBooks = html`<button id="loadBooks">LOAD ALL BOOKS</button>
<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
<div id="chep"></div>`;

const templateForm = html` <form id="add-form">
<h3>Add book</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title..." />
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author..." />
<input type="submit" value="Submit" />
</form>
`;

const templateEditForm = (obj) => html` <form id="edit-form" data-id=${obj[0]}>
<input type="hidden" name="id" />
<h3>Edit book</h3>
<label>TITLE</label>
<input value="${obj[1]}" type="text" name="title" placeholder="Title..." />
<label>AUTHOR</label>
<input value="${obj[2]}" type="text" name="author" placeholder="Author..." />
<input id=${obj[0]} type="submit" value="Save" />
</form>`;

function init() {
  render(html`${templateBooks}`, document.body);
  render(html`${templateForm}`, document.getElementById("chep"));
  document.querySelector("form").addEventListener("submit", handleForm);
}

function handleForm(e){
    e.preventDefault();
    if(e.target.id == 'add-form'){
        onAdd(e);
    } else{
        onEdit(e);
    }
}

async function loadBooks() {
  const response = await fetch(
    "http://localhost:3030/jsonstore/collections/books"
  );
  const data = await response.json();
  const books = Object.entries(data);
  return books;
}

async function displayBooks() {
    const books = await loadBooks();
  const template = (book) => html` <tr>
    <td>${book[1].title}</td>
    <td>${book[1].author}</td>
    <td>
      <button @click=${editFrm.bind(null, [book[0],book[1].title, book[1].author])}>Edit</button>
      <button @click=${deleteBook.bind(null, book[0])}>Delete</button>
    </td>
  </tr>`;
  const root = document.querySelector("tbody");
  render(books.map(template), root);
}
function editFrm(e,id){
    render(html`${templateEditForm(e)}`, document.getElementById('chep'))
    document.querySelector("form").addEventListener("submit", handleForm);
}

async function addBook(title, author){
    const response = await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, author})
    })
    if(!response.ok){
        throw new Error(response.statusText)
    }
}

async function onAdd(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const author = formData.get('author');
    if(title == '' || author == ''){
        return alert('All fields are required!')
    }
    
    await addBook(title, author);
    e.target.reset();
    displayBooks(true);
}

async function editBook(id, title, author){
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, author})
    })
    if(!response.ok){
        throw new Error(response.statusText)
    }
}

async function onEdit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = e.target.getAttribute('data-id');
    const title = formData.get('title');
    const author = formData.get('author');
    if(title == '' || author == ''){
        return alert('All fields are required!')
    }
    await editBook(id, title, author);
    displayBooks();
    render(html`${templateForm}`, document.getElementById('chep'))
    document.querySelector("form").addEventListener("submit", handleForm);
}

async function deleteBook(e, id){
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + e, {
        method: 'delete'
    })
    if(!response.ok){
        throw new Error(response.statusText)
    }
    displayBooks();
}