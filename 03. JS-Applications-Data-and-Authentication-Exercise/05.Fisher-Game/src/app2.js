document.getElementById("logout").addEventListener("click", logOut);
document.getElementsByClassName("load")[0].addEventListener("click", loadCatches)
const catches = document.getElementById("catches");
const main = document.getElementById("main");
const addForm = document.getElementById('addForm')
const email = document.getElementsByClassName("email")[0].getElementsByTagName("span")[0]
// main.style.display = "none";

addForm.addEventListener("submit", createCatch)

window.addEventListener("load", async () => {
    if (!sessionStorage.authToken) {
      document.getElementById("logout").style.display = "none";
      document.getElementsByClassName("add")[0].disabled = true
      email.innerText = "guest"
    } else {
      document.getElementById("login").style.display = "none";
      document.getElementById("register").style.display = "none";
      document.getElementsByClassName("add")[0].disabled = false
      email.innerText = sessionStorage.email
    }
  });

  async function loadCatches() {
    catches.replaceChildren()
    const resp = await fetch(`http://localhost:3030/data/catches`);
    const data = await resp.json();
  
    Object.values(data).forEach((x) => {
      let catchDiv = htmlGenerator('div', '', catches, 'catch');
      htmlGenerator('label', 'Angler', catchDiv);
      htmlGenerator('input', '', catchDiv, 'angler', 'text', x.angler);
  
      htmlGenerator('label', 'Weight', catchDiv);
      htmlGenerator('input', '', catchDiv, 'weight', 'text', x.weight);
  
      htmlGenerator('label', 'Species', catchDiv);
      htmlGenerator('input', '', catchDiv, 'species', 'text', x.species);
  
      htmlGenerator('label', 'Location', catchDiv);
      htmlGenerator('input', '', catchDiv, 'location', 'text', x.location);
  
      htmlGenerator('label', 'Bait', catchDiv);
      htmlGenerator('input', '', catchDiv, 'bait', 'text', x.bait);
  
      htmlGenerator('label', 'Capture Time', catchDiv);
      htmlGenerator('input', '', catchDiv, 'captureTime', 'text', x.captureTime);
  
      let updateBtn = htmlGenerator('button', 'Update', catchDiv, 'update');
      updateBtn.setAttribute('data-id', x._id);
      updateBtn.setAttribute('owner-id', x._ownerId);
      updateBtn.addEventListener('click', updateCatch);
  
      let deleteBtn = htmlGenerator('button', 'Delete', catchDiv, 'delete');
      deleteBtn.setAttribute('data-id', x._id);
      deleteBtn.setAttribute('owner-id', x._ownerId);
      deleteBtn.addEventListener('click', deleteCatch);
    });
    await checkIfDisabled()
    // main.style.display = "inline";
  }
  async function updateCatch(e){
    console.log("here");
    e.preventDefault()
    // let anglerEl =    this.parentElement.getElementsByClassName("angler")[0]
    // let weightEl = this.parentElement.getElementsByClassName("weight")[0]
    // let speciesEl = this.parentElement.getElementsByClassName("species")[0]
    // let locationEl = this.parentElement.getElementsByClassName("location")[0]
    // let baitEl = this.parentElement.getElementsByClassName("bait")[0]
    // let captureTimeEl =this.parentElement.getElementsByClassName("captureTime")[0]
    let [anglerEl, weightEl, speciesEl, locationEl, baitEl, captureTimeEl] = e.target.parentNode.querySelectorAll('input');
    anglerEl.disabled = false
    weightEl.disabled = false
    speciesEl.disabled = false
    locationEl.disabled = false
    baitEl.disabled = false 
    captureTimeEl.disabled = false
    async function idek(){
        let angler = anglerEl.value
        let weight = weightEl.value
        let species = speciesEl.value
        let location = locationEl.value
        let bait = baitEl.value
        let captureTime = captureTimeEl.value
        await fetch(`http://localhost:3030/data/catches/${this.getAttribute("data-id")}`,{
            method:"put",
            headers: { "X-Authorization": sessionStorage.authToken },
            body: JSON.stringify({
                angler,weight,species,location,bait,captureTime
            })
        })
        await loadCatches()
    }
    this.addEventListener("click", idek)

}

async function deleteCatch(e){
    await fetch(`http://localhost:3030/data/catches/${this.getAttribute("data-id")}`,{
        method: "delete",
        headers: { "X-Authorization": sessionStorage.authToken }
    })
    this.parentElement.remove()
}

async function createCatch(e){
    console.log("in");
    e.preventDefault()
    const formData = new FormData(addForm)
    const {angler, weight, species, location, bait, captureTime} =  Object.fromEntries(formData.entries())
    if(!angler || !weight || !species || !location || !bait || !captureTime){console.log("kys"); return;}
    console.log("dn");
    await fetch(`http://localhost:3030/data/catches`,{
        method: "post",
        headers: { "X-Authorization": sessionStorage.authToken },
        body: JSON.stringify({
            angler,weight,species,location,bait,captureTime
        })
    })
    addForm.reset()
    await loadCatches()
}

async function checkIfDisabled(){
    const allBtns = catches.querySelectorAll("button")
    allBtns.forEach(e =>{
        if(e.getAttribute("owner-id") == sessionStorage.userId){
            e.disabled = false
        }
        else{
            e.disabled = true
        }
    })
}

async function logOut() {

      await fetch(`http://localhost:3030/users/logout`, {
        headers: { "X-Authorization": sessionStorage.authToken },
      });
      sessionStorage.clear();
      window.location = `./index.html`;
    
  }

  function htmlGenerator(tag, text, parent, className, type, value) {
    let el = document.createElement(tag);
    el.textContent = text;

    if (parent) {
        parent.appendChild(el);
    }
    if (className) {
        el.className = className;
    }
    if (type) {
        el.setAttribute('type', type);
    }
    if (value) {
        el.setAttribute('value', value);
    }
    el.disabled = true
    return el;
}