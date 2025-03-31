import UserService from "../../services/UserService.js";

document.getElementById("image").addEventListener("change", previewImage);
document.getElementById("confirm-image-btn").addEventListener("click", uploadImage);

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

// Función para subir la imagen
async function uploadImage() {
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];
  const errorMessage = document.getElementById("image-error");

  // Validar si hay un archivo seleccionado
  if (!file) {
    errorMessage.textContent = "❌ Por favor, selecciona una imagen.";
    return;
  }

  // Validar el tipo de archivo
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    errorMessage.textContent = "⚠️ Formato inválido. Solo se permiten imágenes JPG y PNG.";
    return;
  }

  // Limpiar errores previos y mostrar "Cargando..."
  errorMessage.textContent = "";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await UserService.updateUserImage(formData);

    if (response.status !== 204) {
      const errorDetails = await response.text();
      console.error("Error en la actualización de la imagen:", response.status, response.statusText, errorDetails);
      showAlert(`❌ Error al actualizar la imagen: ${errorDetails}`, "danger");
      return;
    }

    showAlert("✅ Imagen actualizada exitosamente.", "success");
  } catch (error) {
    console.error("Error al actualizar la imagen:", error);
    showAlert("❌ Error al actualizar la imagen. Inténtalo de nuevo.", "danger");
  }
}
