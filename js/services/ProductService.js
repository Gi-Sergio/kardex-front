import AuthUtils from "../utils/authUtils.js";

const API_URL = "http://localhost:8080/products"; // Cambia esto por tu URL real

export default class ProductService {
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

  static async getAllByProviderId(providerId, page = 0) {
    
    if (!AuthUtils.isAuthenticated()) return; 

    const pageSize = 6; // Tamaño de página

    const response = await fetch(`${API_URL}/${providerId}/provider?page=${page}&size=${pageSize}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  static async getById(productId) {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  static async create(formData) {
    if (!AuthUtils.isAuthenticated()) return; 

    let response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      },
      body: formData
    });
    return response;
  }

  static async update(productId, formData) {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}/${productId}`, {
     method: "PUT",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      },
      body: formData
    });
    return response;
  }

  static async patch(productId, quantity) {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}/${productId}/quantity?productQuantity=${quantity}`, {
     method: "PATCH",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      }
    });
    return response;
  }

  static async delete(productId) {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}/${productId}`, {
     method: "DELETE",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      }
    });
    return response;
  }
}
