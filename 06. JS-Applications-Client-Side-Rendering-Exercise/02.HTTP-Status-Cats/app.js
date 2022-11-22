import { html, render, nothing} from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const root = document.getElementById('allCats');
const template = (data) => html`
            <li>
                <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click=${showStatus} >Show status code</button>
                    <div class="status" style="display: none" id="${data.id}">
                        <h4>Status Code: ${data.statusCode}</h4>
                        <p>${data.statusMessage}</p>
                    </div>
                </div>
            </li>`;

window.onload = () => {
    render(html`<ul>${cats.map(template)}</ul>`, root)
}

function showStatus() {
    const status = document.getElementById(this.parentNode.querySelector('.status').id);
    if (status.style.display === 'none') {
        status.style.display = 'block';
        this.textContent = 'Hide status code';
        return;
    } else {
        status.style.display = 'none';
        this.textContent = 'Show status code';
    }

}
