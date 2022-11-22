import { render, html } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { detailTemplate } from "../templates/details.js";
import { renderEdit } from "./edit.js";

export async function details(ctx, next) {
    renderBtns()

  async function renderBtns(){
    const id = ctx.params.id;
    const offer = await getOffer(id);
    const userId = sessionStorage.getItem("userId");
    const isOwner = userId == offer._ownerId;
    const isApplied = await getLikesForUser(userId, id)
    const applications = await getAppliesForApp(id)
    render(detailTemplate(offer, applications), document.querySelector("main"));
    if (isOwner) {
      render(
        html` 
          <a href="#" id="edit-btn" @click=${onEdit.bind(null, offer)}>Edit</a>
          <a href="#" id="delete-btn" @click=${deleteOffer.bind(null, offer._id)}>Delete</a>`,
        document.querySelector("#action-buttons")
      );
      //render all applied
    }else{
      if(!isApplied && sessionStorage.authToken){
          render(
              html`<a href="" id="apply-btn" @click=${applyForJob.bind(null,id)}>Apply</a>`, document.querySelector("#action-buttons")
          )
      }
    }
  }

  async function getOffer(id) {
    const response = await fetch(`http://localhost:3030/data/offers/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  }

  async function deleteOffer(id, e) {
    e.preventDefault();
    if(!confirm('Are you sure?')){return;}
    const response = await fetch("http://localhost:3030/data/offers/" + id, {
      method: "delete",
      headers: {
        "X-Authorization": sessionStorage.getItem("authToken"),
      },
    });
    if (response.ok) {
      page.redirect("/dashboard");
    } else {
      const error = await response.json();
      alert(error.message);
    }
  }
  async function onEdit(offer, e){
    e.preventDefault()
    const {title,imageUrl,category,description,requirements,salary, _id} = offer;
    renderEdit(title,imageUrl,category,description,requirements,salary, _id)
  }

    async function getLikesForUser(userId,offerId){
        const response = await fetch(`http://localhost:3030/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message)
        }
        return data
    }
    async function getAppliesForApp(offerId){
        const response = await fetch(`http://localhost:3030/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message)
        }
        return data
    }
    async function applyForJob(offerId, e){
        e.preventDefault()
        const response = await fetch(`http://localhost:3030/data/applications`,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body:JSON.stringify({offerId})
        })
        const data =await response.json()
        if(!response.ok){
            throw new Error(data.message)
        }
        render(
            html``, document.querySelector("#action-buttons")
        )
        renderBtns()
        return data
    }
}
