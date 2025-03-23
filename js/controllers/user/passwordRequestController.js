import PasswordResetService from "../../services/passwordResetService.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".sign-in-form-2");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = form.querySelector("input[type='email']");
    const email = emailInput.value.trim();

    if (!email) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    try {
      const response = await PasswordResetService.requestPasswordReset(email);

      if (response.ok) {
        alert("Se ha enviado un enlace de restablecimiento a su correo.");
        form.reset();
      } else {
        const errorData = await response.json();
        alert(errorData.Message || "Hubo un error al procesar la solicitud.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("No se pudo conectar con el servidor.");
    }
  });
});
