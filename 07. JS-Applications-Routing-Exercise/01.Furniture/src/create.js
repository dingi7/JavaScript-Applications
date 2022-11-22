import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs' 

const template = html `
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control valid" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
    </div>
`

export async function renderCreate(ctx, next) {
    render(template, document.querySelector('main'));
    document.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const make = formData.get('make');
        const model = formData.get('model');
        const year = formData.get('year');
        const description = formData.get('description');
        const price = formData.get('price');
        const img = formData.get('img');
        const material = formData.get('material');
        if(make.length < 4 || model.length < 4 || year == '' || description.length < 10 || price == '' || img == ''){
            return alert('All fields are required!');
        }
        if(price < 0){
            return alert('Price must be a positive number!');
        }
        if(year < 1950 || year > 2050){
            return alert('Year must be between 1950 and 2050!');
        }
        // By valid input you can add the "is-valid" class to the input field, and by invalid the "is-invalid" class.
        // add 'is-valid' class to the input field that is valid
        // add 'is-invalid' class to the input field that is invalid
        try{
            await createFurniture(make, model, year, description, price, img, material);
            ctx.nav(ctx, next);
            page.redirect('/');
        }catch(err){
            alert(err);
        }
    });
}

async function createFurniture(make, model, year, description, price, img, material) {
    const response = await fetch('http://localhost:3030/data/catalog', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify({make, model, year, description, price, img, material})
    });
    if(response.ok == false){
        const error = await response.json();
        throw new Error(error.message);
    }
}