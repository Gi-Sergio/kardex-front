const API_URL = "http://localhost:8081/auth";

export default class AuthService {
  static async login(user) {
    
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    return response.json();
  }
}
  