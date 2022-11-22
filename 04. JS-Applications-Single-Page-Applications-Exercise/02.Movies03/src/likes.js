async function getMovieLikes(id){
    // /data/likes?where=movieId%3D%22{movieId}%22&distinct=_ownerId&count 
    const response = await fetch("http://localhost:3030/data/likes?where=movieId%3D%22" + id + "%22&distinct=_ownerId&count");
    const data = await response.json();
    if(!response.ok){
        alert(data.message);
        throw new Error(data.message);
    }
    return data;
}

async function isUserLiked(movieId, userId){
    const response = await fetch("http://localhost:3030/data/likes?where=movieId%3D%22" + movieId + "%22%20and%20_ownerId%3D%22" + userId + "%22&count");
    const data = await response.json();
    if(!response.ok){
        alert(data.message);
        throw new Error(data.message);
    }
    return data;
}

async function like(movieId){
    const response = await fetch("http://localhost:3030/data/likes",{
        method: "POST",
        headers: {"Content-Type": "application/json","X-Authorization": sessionStorage.getItem("accessToken")},
        body: JSON.stringify({movieId})
    });
    const data = await response.json();
    if(!response.ok){
        alert(data.message);
        throw new Error(data.message);
    }
    return data;
}

export {getMovieLikes, isUserLiked, like}