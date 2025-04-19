import AuthUtils from "../utils/authUtils.js";

const API_URL = "http://localhost:8082/cart"; // Cambia esto por tu URL real

export default class Orderservice {
  static async getAll() {
    if (!AuthUtils.isAuthenticated()) return;

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  static async addItem(productId, quantity) {
    if (!AuthUtils.isAuthenticated()) return;

    let response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthUtils.getToken()}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    });
    return response;
  }

  static async removeItem(productId) {
    if (!AuthUtils.isAuthenticated()) return;

    const response = await fetch(`${API_URL}/remove/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`,
      },
    });
    return response;
  }
}
