// http://localhost:3030/users/login
// http://localhost:3030/users/register
// http://localhost:3030/users/logout

// window.addEventListener("load", checkIfLogged)

// function checkIfLogged() {
//   if (sessionStorage.authToken) {
//     window.location = "/index.html";
//   }
// };


const logInForm = document.getElementById("form-login");
const notification = document.getElementsByClassName("notification")[0];

logInForm.addEventListener("submit", logIn);

async function logIn(e) {
  let formData = new FormData(logInForm);
  let { email, password } = Object.fromEntries(formData.entries());
  e.preventDefault();
  notification.textContent = ""
  try {
    if (!email || !password) {
      throw new Error("All fields are required!");
    }
    const response = await fetch(`http://localhost:3030/users/login`, {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error("Unauthorized!");
    }
    const data = await response.json();
    sessionStorage.setItem("authToken", data.accessToken);
    sessionStorage.setItem("userId", data._id);
    sessionStorage.setItem("email", email);
    window.location = `/index.html`;
  } catch (e) {
    notification.textContent = e.message;
    logInForm.reset();
  }
}
