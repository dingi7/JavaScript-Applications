function e(tag, text, className) {
  let el = document.createElement(tag);
  el.textContent = text;
  if (className) {
    el.className = className;
  }
  return el;
}

function showView(section) {
  const main = document.querySelector("main");
  main.replaceChildren(section);
}

function nav() {
  const welcomeMsg = document.getElementById("welcome-msg");
  const userElements = document.getElementsByClassName("nav-item user");
  const guestElements = document.getElementsByClassName("nav-item guest");
  if (sessionStorage.accessToken) {
    [...userElements].forEach((el) => (el.style.display = "block"));
    welcomeMsg.textContent = `Welcome, ${sessionStorage.email}`;
    [...guestElements].forEach((el) => (el.style.display = "none"));
  } else {
    [...userElements].forEach((el) => (el.style.display = "none"));
    [...guestElements].forEach((el) => (el.style.display = "block"));
  }
}

export { e, showView, nav };
