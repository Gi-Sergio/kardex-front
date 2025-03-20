import UserService from "../../services/UserService.js";

const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

document.getElementById("image").addEventListener("change", previewImage);

// Botón para confirmar imagen
document.getElementById("confirm-image-btn").addEventListener("click", async () => {
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    const errorMessage = document.getElementById("image-error");
    // Validar si hay un archivo seleccionado
    if (!file) {
        errorMessage.textContent = "Por favor, selecciona una imagen.";
        return;
    }

    // Validar el tipo de archivo
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
        errorMessage.textContent = "Formato inválido. Solo se permiten imágenes JPG y PNG.";
        return;
    }

    // Limpiar errores previos y mostrar "Cargando..."
    errorMessage.textContent = "";
    loadingMessage.style.display = "block";

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await UserService.updateUserImage(userId, formData);

        if (response.status !== 204) {
            const errorDetails = await response.text();
            console.error("Error en la actualización de la imagen:", response.status, response.statusText, errorDetails);
            alert(`Error al actualizar la imagen: ${errorDetails}`);
            return;
        }

        alert("Imagen actualizada exitosamente.");
    } catch (error) {
        errorMessage.textContent = "Error al actualizar la imagen. Inténtalo de nuevo.";
    } finally {
        loadingMessage.style.display = "none"; // Ocultar "Cargando..."
    }
});

// Función para previsualizar la imagen antes de subirla
function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("user-image-preview");
    const errorMessage = document.getElementById("image-error");

    if (file && file.type.startsWith("image/")) {
        preview.src = URL.createObjectURL(file);
        errorMessage.textContent = "";
    }
}
