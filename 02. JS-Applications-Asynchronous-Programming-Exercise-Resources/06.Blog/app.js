function attachEvents() {
  const postComments = document.getElementById("post-comments");
  const postTitle = document.getElementById("post-title");
  const postBody = document.getElementById("post-body");
  const select = document.getElementById("posts");
  const loadPostsBtn = document.getElementById("btnLoadPosts");
  const viewBtn = document.getElementById("btnViewPost");

  loadPostsBtn.addEventListener("click", () => loadPosts());
  viewBtn.addEventListener("click", () => loadComments());

  async function loadPosts(e) {
    let resp = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
    let data = await resp.json();
    select.replaceChildren();
    for (let [key, value] of Object.entries(data)) {
      let option = htmlGen("option", value.title);
      option.value = key;
      select.appendChild(option);
    }
  }

  async function loadComments(e) {
    try {
      let infoRes = await fetch(
        `http://localhost:3030/jsonstore/blog/posts/`
      );
      let dataInfo = await infoRes.json();
      const title = select.options[select.selectedIndex].text;
      const body = Object.values(dataInfo).find(x => x.title === title);
      postTitle.textContent = title;
      postBody.textContent = body.body;
      let id = select.value;
      let res = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
      let d = await res.json();
      let comments = [];
      for (let [key, value] of Object.entries(d)) {
        if (value.postId === id) {
          comments.push(value);
        }
      }
      postComments.replaceChildren();
      comments.forEach((el) => {
        let li = htmlGen("li", el.text);
        li.id = el.id;
        postComments.appendChild(li);
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  function htmlGen(name, text, className) {
    let el = document.createElement(name);
    el.textContent = text;
    if (className) {
      el.className = className;
    }
    return el;
  }
}

attachEvents();
