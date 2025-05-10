import AuthUtils from "../utils/authUtils.js"; // Importa el módulo authUtils.js
const API_URL = "http://localhost:8081/users";


export default class UserService {
  static async createUser(formData) {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      body: formData
    });
    return response;
}


  static async updateUser(user) {
    console.log("📌 Enviando datos a updateUser:", user);
    if (!AuthUtils.isAuthenticated()) return;

    const response = await fetch(`${API_URL}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    return response;
  }

  static async updateUserImage(formData) {
    if (!AuthUtils.isAuthenticated()) return;

    const response = await fetch(`${API_URL}/update/image`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      },
      body: formData
    });
    return response;
  }

  static async getUser() {
    if (!AuthUtils.isAuthenticated()) return;

    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    return response.json();
  }
}