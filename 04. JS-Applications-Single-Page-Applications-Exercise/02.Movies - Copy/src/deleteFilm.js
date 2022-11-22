import {showHome } from "./home.js";

async function onDeleteMovie(id) {
  try {
    await deleteMovie(id);
    showHome();
  } catch (err) {
    alert(err.message);
  }
}

async function deleteMovie(id) {
  const response = await fetch("http://localhost:3030/data/movies/" + id, {
    method: "delete",
    headers: { "X-Authorization": sessionStorage.getItem("accessToken") },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export { onDeleteMovie };