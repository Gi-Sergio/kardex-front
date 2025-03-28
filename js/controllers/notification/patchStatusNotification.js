import NotificationService from "../../services/NotificationService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";

// Obtener los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const notificationId = params.get("id");

// Obtiene el formulario
const form = document.getElementById("notification-patch-form");

// Escucha el evento submit del formulario
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Previene el envío tradicional del formulario

  let loading = document.getElementById("patch-loading");
  loading.style.display = "block";
  form.style.display = "none";

  try {
    await updateNotificationStatus();
  } catch (error) {
    console.error("Error al actualizar notificacion:", error);
    alert("Hubo un error al actualizar la notificacion. Intenta de nuevo.");
  } finally {
    loading.style.display = "none";
    form.style.display = "flex";
    window.location.reload();
  }
});

let updateNotificationStatus = async () => {
  
  const status = document.getElementById("notification-status-update").value;

  const response = await NotificationService.patch(notificationId, status);

  if (response.status != 204) {
    const errorDetails = await response.text();
    console.error(
      "Error en la actualizacion del notificacion:",
      response.status,
      response.statusText,
      errorDetails
    );
    alert(`Error al actualizar la notificacion: ${errorDetails}`);
    return false;
  }

  console.log("notificacion actualizada con éxito");
  alert("notificacion actualizado con éxito");
  return true;
};
