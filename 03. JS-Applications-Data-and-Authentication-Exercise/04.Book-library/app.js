console.log("My requests...");
const url = `http://localhost:3030/jsonstore/collections/books`;
const tbody = document.querySelector("tbody");
const loadBtn = document.getElementById("loadBooks");
const form = document.getElementsByTagName("form")[0];
const formh3 = form.querySelector("h3");
const formBtn = form.querySelector("button");

formBtn.addEventListener("click", createBook);
loadBtn.addEventListener("click", loadBooks);

async function loadBooks() {
  tbody.replaceChildren();
  const res = await fetch(url);
  const data = await res.json();

  Object.entries(data).forEach(([key, value]) => {
    let tr = htmlGen("tr", undefined, tbody);
    htmlGen("td", value.title, tr);
    htmlGen("td", value.author, tr);
    let td = htmlGen("td", undefined, tr);
    let btnEdit = htmlGen("button", "Edit", td);
    let btnDelete = htmlGen("button", "Delete", td);

    btnEdit.addEventListener("click", async () => {
      document.getElementsByName("title")[0].value = value.title;
      document.getElementsByName("author")[0].value = value.author;
      formBtn.id = key;
      formBtn.textContent = "Save";
      formh3.textContent = "Edit FORM";
    });

    btnDelete.addEventListener("click", async () => {
      await fetch(`${url}/${key}`, {
        method: "delete",
      });
      tr.remove();
    });
  });
}

async function createBook(e) {
  e.preventDefault();
  if (e.target.textContent === "Submit") {
    const formData = new FormData(form);
    const { title, author } = Object.fromEntries(formData.entries());
    if (!title || !author) {
      return;
    }
    await fetch(url, {
      method: "post",
      body: JSON.stringify({
        title,
        author,
      }),
    });
    document.getElementsByName("title")[0].value = "";
    document.getElementsByName("author")[0].value = "";
    //optimise?
  } else {
    const formData = new FormData(form);
    const { title, author } = Object.fromEntries(formData.entries());
    if (!title || !author) {
      return;
    }
    await fetch(`${url}/${formBtn.id}`, {
      method: "put",
      body: JSON.stringify({
        title,
        author,
      }),
    });
    formBtn.removeAttribute("id");
    formBtn.textContent = "Submit";
    formh3.textContent = "FORM";
    document.getElementsByName("title")[0].value = "";
    document.getElementsByName("author")[0].value = "";
  }
  loadBooks();
}

function htmlGen(tag, text, parent) {
  let el = document.createElement(tag);
  el.textContent = text;
  if (parent) {
    parent.appendChild(el);
  }
  return el;
}
