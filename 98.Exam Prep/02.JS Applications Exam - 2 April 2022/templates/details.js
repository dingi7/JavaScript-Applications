import { html } from "../node_modules/lit-html/lit-html.js";

export const detailsTemplate = (pet, donations) => html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="./images/Shiba-Inu.png">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${donations * 100}$</h4>
                    </div>
                    <div class="actionBtn">
                    <!-- if there is no registered user, do not display div-->
                    </div>
                </div>
            </div>
        </section>
`

