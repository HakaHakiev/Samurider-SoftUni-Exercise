import { html } from "../../node_modules/lit-html/lit-html.js";
import { editMotorcycleById, getMotorcycleById } from "../api/data.js";

const editTemplate = (motorcycle, onSubmit) => html`
  <section id="edit">
    <h2>Edit Motorcycle</h2>
    <div class="form">
      <h2>Edit Motorcycle</h2>
      <form class="edit-form">
        <input
          type="text"
          name="model"
          id="model"
          placeholder="Model"
          value="${motorcycle.model}"
        />
        <input
          type="text"
          name="imageUrl"
          id="moto-image"
          placeholder="Moto Image"
          value="${motorcycle.imageUrl}"
        />
        <input
          type="number"
          name="year"
          id="year"
          placeholder="Year"
          value="${motorcycle.year}"
        />
        <input
          type="number"
          name="mileage"
          id="mileage"
          placeholder="mileage"
          value="${motorcycle.mileage}"
        />
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="contact"
          value="${motorcycle.contact}"
        />
        <textarea
          id="about"
          name="about"
          placeholder="about"
          rows="10"
          cols="50"
        >
"${motorcycle.about}"</textarea
        >
        <button type="submit">Edit Motorcycle</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const motorcycleId = ctx.params.id;

  const motorcycle = await getMotorcycleById(motorcycleId);
  ctx.render(editTemplate(motorcycle, onSubmit));

  async function onSubmit(motorcycle) {
    motorcycle.preventDefault();
    const formData = new FormData(motorcycle.target);

    const editMotorcycle = {
      name: formData.get("name"),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
      nutrition: formData.get("nutrition"),
    };

    if (Object.values(editMotorcycle).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editMotorcycleById(motorcycleId, editMotorcycle);
    motorcycle.target.reset();
    ctx.page.redirect(`/details/${motorcycleId}`);
  }
}
