import AuthService from "../../services/AuthService.js";

const alertContainer = document.getElementById("alert-container");

async function handleCredentialResponse(response) {
  const idToken = response.credential;
  try {
    const data = await AuthService.loginWithGoogle(idToken);

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
    showAlert(
      "Error al conectar con el servidor. Intenta de nuevo más tarde.",
      "danger"
    );
  }
}

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

window.handleCredentialResponse = handleCredentialResponse;