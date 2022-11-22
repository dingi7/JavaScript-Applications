const form = document.querySelector("form");
const notification = document.getElementsByClassName("notification")[0];
form.addEventListener("submit", register);

// window.addEventListener("load", checkIfLogged)

// function checkIfLogged() {
//   if (sessionStorage.authToken) {
//     window.location = "/index.html";
//   }
// };

async function register(e) {
  e.preventDefault();
  notification.textContent = "";
  try {
    const formData = new FormData(form);
    const { email, password, rePass } = Object.fromEntries(formData.entries());
    if (!email || !password || !rePass) {
      throw new Error("All fields are required!");
    }
    const resp = await fetch(`http://localhost:3030/users/register`, {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    const data = await resp.json();
    sessionStorage.setItem("authToken", data.accessToken);
    sessionStorage.setItem("userId", data._id);
    sessionStorage.setItem("email", email);
    window.location = `./index.html`;
  } catch (e) {
    notification.textContent = e.message;
  }
}
