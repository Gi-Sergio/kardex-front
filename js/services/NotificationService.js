import AuthUtils from "../utils/authUtils.js";

const API_URL = "http://localhost:8082/notifications"; // Cambia esto por tu URL real

export default class  Notificationservice {
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

  static async patch(notificationId, statusId) {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}/${notificationId}/status?notificationStatus=${statusId}`, {
     method: "PATCH",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      }
    });
    return response;
  }

  static async delete(notificationId) {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}/${notificationId}`, {
     method: "DELETE",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      }
    });
    return response;
  }

  static async deleteAllReadNotifications() {
    if (!AuthUtils.isAuthenticated()) return; 

    const response = await fetch(`${API_URL}`, {
     method: "DELETE",
      headers: {
        Authorization: `Bearer ${AuthUtils.getToken()}`
      }
    });
    return response;
  }
}
