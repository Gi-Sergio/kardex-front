import AuthService from "../../services/AuthService.js";

const form = document.getElementById("sign-in-form");
const alertContainer = document.getElementById("alert-container");

// Función para mostrar alertas de Bootstrap flotantes
const showAlert = (message, type) => {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} alert-dismissible fade show`;
  alert.role = "alert";
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  alertContainer.appendChild(alert);

  // Eliminar la alerta después de 4 segundos
  setTimeout(() => {
    alert.remove();
  }, 4000);
};

// Evento de envío de formulario
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  await loginUser();
});

const loginUser = async () => {
  const user = {
    email: document.getElementById("user-sign-in").value.trim(),
    password: document.getElementById("password-sign-in").value.trim(),
  };

  if (!user.email || !user.password) {
    showAlert("Por favor, ingresa tu correo y contraseña.", "danger");
    return;
  }

  try {
    const data = await AuthService.login(user);

    if (data.Message && data.Message === "Incorrect username or password") {
      showAlert("Usuario o contraseña incorrectos.", "danger");
      return;
    }

    if (data.token) {
      showAlert("Inicio de sesión exitoso. Redirigiendo...", "success");

      setTimeout(() => {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      }, 1500);
    } else {
      showAlert("Error: No se recibió un token.", "danger");
    }
  } catch (error) {
    console.error("Error en el login:", error);
    showAlert("Error al conectar con el servidor. Intenta de nuevo más tarde.", "danger");
  }
};
