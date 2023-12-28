import { html } from "../../node_modules/lit-html/lit-html.js";

import { search } from "../api/data.js";
import { getUserData } from "../utility.js";

const searchTemplate = (motorcycles, onSearch, user) => html`
  <section id="search">
    <div class="form">
      <h4>Search</h4>
      <form class="search-form">
        <input type="text" name="search" id="search-input" />
        <button @click=${onSearch} class="button-list">Search</button>
      </form>
    </div>
    <h4 id="result-heading">Results:</h4>

    ${motorcycles != undefined
      ? html`<div class="search-result">
          ${motorcycles.length == 0
            ? html`<h2 class="no-avaliable">No result.</h2>`
            : motorcycles.map(
                (m) => html`<div class="motorcycle">
                  <img src="${m.imageUrl}" alt="example1" />
                  <h3 class="model">${m.model}</h3>
                  <a class="details-btn" href="/details/${m._id}">More Info</a>
                </div>`
              )}
        </div>`
      : ""}
  </section>
`;

export async function searchPage(ctx) {
  let user = getUserData(ctx.user);
  console.log(user);
  let motorcycles = undefined;

  const name = ctx.querystring.split("=")[1];
  if (name !== undefined) {
    motorcycles = await search(name);
  }
  console.log(motorcycles);
  ctx.render(searchTemplate(motorcycles, onSearch, user));

  async function onSearch() {
    const query = document.querySelector("#search-input").value;
    if (query !== "") {
      ctx.page.redirect(`/search?query=${query}`);
    } else {
      return alert("All fields are required!");
    }
  }
}
