async function onEditMovie(title, description, img, id) {
  const editMovieSection = document.getElementById("edit-movie");
  const form = document.getElementsByClassName(
    "text-center border border-light p-5"
  )[1];
  editMovieSection.getElementsByTagName("input")[0].value = title;
  editMovieSection.getElementsByTagName("textarea")[0].value = description;
  editMovieSection.getElementsByTagName("input")[1].value = img;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const img = formData.get("img");
    if (title == "" || description == "" || img == "") {
      return alert("All fields are required!");
    }
    try {
      await editMovie(title, description, img, id);
      showDetailsPage(undefined, id);
    } catch (err) {
      alert(err.message);
    }
  });
  const sections = [...document.querySelectorAll("section")];
  sections.forEach((section) => {
    section.style.display = "none";
  });
  editMovieSection.style.display = "block";
}

async function editMovie(title, description, img, id) {
  const response = await fetch("http://localhost:3030/data/movies/" + id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": sessionStorage.getItem("accessToken"),
    },
    body: JSON.stringify({ title, description, img }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export { onEditMovie };
