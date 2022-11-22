import { html } from "../node_modules/lit-html/lit-html.js";

export const editTemplate = (title,img,category,description,requirements,salary) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                value="${title}"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                value="${img}"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                value="${category}"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              >${description}</textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              >${requirements}</textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                value="${salary}"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`