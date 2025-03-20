class AuthService {
    static async login(email, password) {
      const user = { email, password };
  
      try {
        const response = await fetch("http://localhost:8081/auth/login", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
  
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error("Error en la solicitud de login:", error);
        throw error;
      }
    }
  }
  
  export default AuthService;
  