import { html } from "../../node_modules/lit-html/lit-html.js";
import { addMotorcycle } from "../api/data.js";

const createTemplate = (onSubmit) => html`
  <section id="create">
    <h2>Add Motorcycle</h2>
    <div class="form">
      <h2>Add Motorcycle</h2>
      <form class="create-form" @submit=${onSubmit}>
        <input type="text" name="model" id="model" placeholder="Model" />
        <input
          type="text"
          name="imageUrl"
          id="moto-image"
          placeholder="Moto Image"
        />
        <input type="number" name="year" id="year" placeholder="Year" />
        <input
          type="number"
          name="mileage"
          id="mileage"
          placeholder="mileage"
        />
        <input type="text" name="contact" id="contact" placeholder="contact" />
        <textarea
          id="about"
          name="about"
          placeholder="about"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add Motorcycle</button>
      </form>
    </div>
  </section>
`;

export async function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(motorcycle) {
    motorcycle.preventDefault();
    const formData = new FormData(motorcycle.target);

    const newMotorcycle = {
      model: formData.get("model"),
      imageUrl: formData.get("imageUrl"),
      year: formData.get("year"),
      mileage: formData.get("mileage"),
      contact: formData.get("contact"),
      about: formData.get("about"),
    };

    if (Object.values(newMotorcycle).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addMotorcycle(newMotorcycle);
    motorcycle.target.reset();
    ctx.page.redirect("/dashboard");
  }
}
