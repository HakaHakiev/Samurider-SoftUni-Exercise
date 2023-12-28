import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all listings
export async function getAllMotorcycles() {
  return await api.get(host + "/data/motorcycles?sortBy=_createdOn%20desc");
}

// get listing by id
export async function getMotorcycleById(id) {
  return await api.get(host + `/data/motorcycles/${id}`);
}

// create listing
export async function addMotorcycle(motorcycle) {
  return await api.post(host + "/data/motorcycles", motorcycle);
}

// edit listing by id
export async function editMotorcycleById(id, motorcycle) {
  return await api.put(host + `/data/motorcycles/${id}`, motorcycle);
}

// delete listing by id
export async function deleteMotorcycleById(id) {
  return await api.del(host + `/data/motorcycles/${id}`);
}

export async function search(query) {
  return await api.get(
    host + `/data/motorcycles?where=model%20LIKE%20%22${query}%22`
  );
}
