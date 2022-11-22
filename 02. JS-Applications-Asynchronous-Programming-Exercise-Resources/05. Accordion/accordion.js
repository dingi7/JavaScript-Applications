document.addEventListener("DOMContentLoaded", solution);
async function solution() {
  let main = document.getElementById("main");
  let resp = await fetch(
    `http://localhost:3030/jsonstore/advanced/articles/list`
  );
  let data = await resp.json();
  data.forEach(async (element) => {
    let divAcc = htmlGen("div", undefined, "accordion");
    let divHead = htmlGen("div", undefined, "head");
    let span = htmlGen("div", element.title);
    let button = htmlGen("button", "More");
    button.id = element._id;
    let rs = await fetch(
      `http://localhost:3030/jsonstore/advanced/articles/details/${button.id}`
    );
    let d = await rs.json();
    let divExtra = htmlGen("div", undefined, "extra");
    let p = htmlGen("p", d.content);
    divHead.appendChild(span);
    divHead.appendChild(button);
    divExtra.appendChild(p);
    divAcc.appendChild(divHead);
    divAcc.appendChild(divExtra);
    main.appendChild(divAcc);
    button.addEventListener("click", async () => {
      if (button.textContent === "More") {
        divExtra.style.display = "block";
        button.textContent = "Less";
      }
      else{
        divExtra.style.display = "none";
        button.textContent = "More";
      }
    });
  });

  function htmlGen(name, text, className) {
    let el = document.createElement(name);
    el.textContent = text;
    if (className) {
      el.className = className;
    }
    return el;
  }
}

