async function loadData() {
  try {
    const response = await fetch(
      `http://localhost:3030/jsonstore/collections/myboard/posts`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (err) {
    alert(err.message);
  }
  return data;
}

function displayContent(data){
    data.forEach(post => {
    });
}
