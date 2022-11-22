import { render, html } from "../node_modules/lit-html/lit-html.js";
import { detailsTemplate } from "../templates/details.js";
import page from '../node_modules/page/page.mjs'
import { renderEdit } from "./edit.js";

export async function details(ctx, next) {
  const id = ctx.params.id;
  const pet = await getPet(id);
  const donations = await getDonationsForPet(id)
  const isDonated = await getDonationsForUser(sessionStorage.userId, id)
  render(detailsTemplate(pet, donations), ctx.content);
  if (pet._ownerId == sessionStorage.userId) {
    render(
      html`
        <a href="#" class="edit" @click=${onEditOffer.bind(null, pet)}>Edit</a>
        <a href="#" class="remove" @click=${deleteOffer.bind(null, id)}>Delete</a>
      `,
      document.getElementsByClassName("actionBtn")[0]
    );
  } else if (sessionStorage.authToken && !isDonated) {
    render(
      html` <a href="#" class="donate" @click=${donate.bind(null,id)}>Donate</a> `,
      document.getElementsByClassName("actionBtn")[0]
    );  
  }
}

async function deleteOffer(id, e){
    e.preventDefault()
    if(!confirm("Are you sure?")){
        return;
    }
    const response = await fetch("http://localhost:3030/data/pets/" + id, {
        method: "delete",
        headers: {
          "X-Authorization": sessionStorage.getItem("authToken"),
        },
      });
      if (response.ok) {
        page.redirect("/");
      } else {
        const error = await response.json();
        alert(error.message);
      }
}

async function onEditOffer(pet, e){
    e.preventDefault()
    const {name, breed, age, weight, image, _id} = pet
    console.log(_id)
    renderEdit(name, breed, age, weight, image, _id)
}

async function getPet(id) {
  const respose = await fetch(`http://localhost:3030/data/pets/` + id);
  const data = await respose.json();
  if (!respose.ok) {
    throw new Error(data.message);
  }
  return data;
}

async function getDonationsForPet(petId){
    const response = await fetch(`http://localhost:3030/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
}

async function getDonationsForUser(userId, petId){
    const response = await fetch(`http://localhost:3030/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
}

async function donate(petId, e){
    e.preventDefault()
    const response = await fetch(`http://localhost:3030/data/donation`,
    {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body:JSON.stringify({petId})
    })
    const data =await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    render(
        html``, document.getElementsByClassName('actionBtn')[0]
    )
    const newDonations = await getDonationsForPet(petId)
    document.getElementsByClassName('donation')[0].textContent = "Donation: " + newDonations * 100 + "$"
}