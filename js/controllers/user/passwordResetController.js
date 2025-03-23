import PasswordResetService from "../../services/passwordResetService.js";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".sign-in-form-2");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token"); // Obtiene el token desde la URL
        const passwordInput = document.getElementById("new-password").value;
        const confirmPasswordInput = document.getElementById("confirm-password").value;

        if (!passwordInput || !confirmPasswordInput) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (passwordInput !== confirmPasswordInput) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await PasswordResetService.resetPassword(token, passwordInput);

            if (response.ok) {
                alert("Contraseña cambiada exitosamente. Redirigiendo...");
                window.location.href = "login.html"; // Redirige a la página de inicio de sesión
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.Message || "No se pudo cambiar la contraseña."}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un problema con la solicitud. Inténtalo de nuevo.");
        }
    });
});