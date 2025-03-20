import AuthService from "../../services/AuthService.js";

const form = document.getElementById("sign-in-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Evita el envío predeterminado del formulario
  await loginUser(); // Llama a la función para iniciar sesión
});

const loginUser = async () => {
  const email = document.getElementById("user-sign-in").value.trim();
  const password = document.getElementById("password-sign-in").value.trim();

  if (!email || !password) {
    alert("Por favor, ingresa tu correo y contraseña.");
    return;
  }

  try {
    const data = await AuthService.login(email, password);

    if (data.Message && data.Message === "Incorrect username or password") {
      alert("Usuario o contraseña incorrectos.");
      return;
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      alert("Error: No se recibió un token.");
    }
  } catch (error) {
    console.error("Error en el login:", error);
    alert("Error al conectar con el servidor. Intenta de nuevo más tarde.");
  }
};
