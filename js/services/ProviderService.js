import AuthUtils from "../utils/authUtils.js";

const API_URL = "http://localhost:8080/providers"; // Cambia esto por tu URL real

export default class ProviderService {
  static async getAll(page = 0) {
    
    if (!AuthUtils.isAuthenticated()) return; 

    const pageSize = 6; // Tamaño de página

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

  static async getAllProvidersName(page = 0) {
    
    if (!AuthUtils.isAuthenticated()) return;   

    const response = await fetch(`${API_URL}/providerName`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  static async getById(providerId) {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}/${providerId}`, {
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

  static async update(providerId, formData) {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}/${providerId}`, {
     method: "PUT",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      },
      body: formData
    });
    return response;
  }

  static async patch(providerId, quantity) {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}/${providerId}/quantity?ProviderQuantity=${quantity}`, {
     method: "PATCH",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      }
    });
    return response;
  }

  static async delete(providerId) {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}/${providerId}`, {
     method: "DELETE",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      }
    });
    return response;
  }
}
