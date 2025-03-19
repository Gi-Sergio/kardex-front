export default class AuthUtils {
  static getToken() {
    return localStorage.getItem("token");
  }

  static isAuthenticated() {
    const token = this.getToken();
    if (!token) {
      console.error("No hay token, el usuario no está autenticado");
      return false;
    }
    return true;
  }
}