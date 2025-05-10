import PasswordResetService from "../../services/passwordResetService.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".sign-in-form-2");
    const alertContainer = document.getElementById("alert-container");

    // Función para mostrar alertas de Bootstrap
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

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token"); // Obtiene el token desde la URL
        const passwordInput = document.getElementById("new-password").value;
        const confirmPasswordInput = document.getElementById("confirm-password").value;

        if (!passwordInput || !confirmPasswordInput) {
            showAlert("⚠️ Por favor, completa todos los campos.", "danger");
            return;
        }

        if (passwordInput !== confirmPasswordInput) {
            showAlert("❌ Las contraseñas no coinciden.", "danger");
            return;
        }

        try {
            const response = await PasswordResetService.resetPassword(token, passwordInput);

            if (response.ok) {
                showAlert("✅ Contraseña cambiada exitosamente. Redirigiendo...", "success");

                setTimeout(() => {
                    window.location.href = "login.html"; // Redirige después de 2 segundos
                }, 2000);
            } else {
                const errorData = await response.json();
                showAlert(`❌ Error: ${errorData.Message || "No se pudo cambiar la contraseña."}`, "danger");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            showAlert("❌ Hubo un problema con la solicitud. Inténtalo de nuevo.", "danger");
        }
    });
});
