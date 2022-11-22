async function onLike(id) {
  try {
    await likeMovie(id);
    return true;
  } catch (err) {
    alert(err.message);
  }
}

async function likeMovie(id) {
  const response = await fetch("http://localhost:3030/data/likes", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": sessionStorage.getItem("accessToken"),
    },
    body: JSON.stringify({ movieId: id }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

async function getMovieLikes(id) {
  const response = await fetch(
    `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

async function isLiked(movieId, userId){
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    console.log(data)
    return data;

}

async function revokeLike(movieId, userId){
    const response = await fetch(`http://localhost:3030/data/likes/${movieId}`, {
        method: "delete",
        headers: {
            "X-Authorization": sessionStorage.getItem("accessToken")
        }
    });

    if(!response.ok){
        const data = await response.json();
        throw new Error(data.message);
    }
}

export { onLike, getMovieLikes, isLiked };