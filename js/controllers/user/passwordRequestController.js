import PasswordResetService from "../../services/passwordResetService.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".sign-in-form-2");
  const alertContainer = document.getElementById("alert-container");

  // Función para mostrar alertas de Bootstrap en el centro superior
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

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = form.querySelector("input[type='email']");
    const email = emailInput.value.trim();

    if (!email) {
      showAlert("⚠️ Por favor, ingrese un correo electrónico válido.", "danger");
      return;
    }

    try {
      const response = await PasswordResetService.requestPasswordReset(email);

      if (response.ok) {
        showAlert("✅ Se ha enviado un enlace de restablecimiento a su correo.", "success");
        form.reset();
      } else {
        const errorData = await response.json();
        showAlert(errorData.Message || "❌ Hubo un error al procesar la solicitud.", "danger");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      showAlert("❌ No se pudo conectar con el servidor.", "danger");
    }
  });
});
