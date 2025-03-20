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


  static async updateUser(userId, user) {
    if (!AuthUtils.isAuthenticated()) return;

    const response = await fetch(`${API_URL}/${userId}`, {
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

  static async updateUserImage(userId, formData) {
    if (!AuthUtils.isAuthenticated()) return;

    const response = await fetch(`${API_URL}/${userId}/image`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      },
      body: formData
    });
    return response;
  }

  static async getUser(userId) {
    if (!AuthUtils.isAuthenticated()) return;

    const response = await fetch(`${API_URL}/${userId}`, {
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