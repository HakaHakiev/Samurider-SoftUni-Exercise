import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteMotorcycleById, getMotorcycleById } from "../api/data.js";

const detailsTemplate = (motorcycle, isOwner, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${motorcycle.imageUrl}" alt="example1" />
      <p id="details-title">${motorcycle.model}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="year">Year: ${motorcycle.year}</p>
          <p class="mileage">Mileage: ${motorcycle.mileage} km.</p>
          <p class="contact">Contact Number: ${motorcycle.contact}</p>
          <p id="motorcycle-description">${motorcycle.about}</p>
        </div>
        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
          ${isOwner
            ? html` <a href="/edit/${motorcycle._id}" id="edit-btn">Edit</a>
                <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
                  >Delete</a
                >`
            : ""}
        </div>
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const motorcycleId = ctx.params.id;
  const motorcycle = await getMotorcycleById(motorcycleId);
  const user = ctx.user;

  const isOwner = user && motorcycle._ownerId == user._id;
  ctx.render(detailsTemplate(motorcycle, isOwner, onDelete));

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteMotorcycleById(motorcycleId);
      ctx.page.redirect("/dashboard");
    }
  }
}
