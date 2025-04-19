import AuthUtils from "../utils/authUtils.js";

const API_URL = "http://localhost:8082/orders"; // Cambia esto por tu URL real

export default class Orderservice {
  static async getAll(page = 0, pageSize) {
    if (!AuthUtils.isAuthenticated()) return;

    const response = await fetch(`${API_URL}?page=${page}&size=${pageSize}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  static async create(order) {
    if (!AuthUtils.isAuthenticated()) return;

    let response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthUtils.getToken()}`,
      },
      body: JSON.stringify(order),
    });
    return response;
  }

  static async getById(orderId, tokenOrder) {
    if (!AuthUtils.isAuthenticated()) return;

    const response = await fetch(`${API_URL}/${orderId}/${tokenOrder}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  static async getOrderStatusHistory(orderId) {
    const response = await fetch(`${API_URL}/${orderId}/orderHistory`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  static async update(orderId, statusId) {
    const response = await fetch(`${API_URL}/${orderId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ statusId: statusId })
    });
    return response;
  }

  static async addItem(productId, quantity){
    if (!AuthUtils.isAuthenticated()) return;

    let response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthUtils.getToken()}`,
      },
      body: JSON.stringify(
        { 
          productId: productId,
          quantity: quantity
        })
    });
    return response;
  }
}
