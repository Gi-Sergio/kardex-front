import NotificationService from "../../services/NotificationService.js";

const btnDelete = document.getElementById("btn-delete-product");
const deleteModal = document.getElementById("delete-modal");

btnDelete.addEventListener("click", async function () {

  let loading = document.getElementById("delete-loading");
  loading.style.display = "block";
  deleteModal.style.display = "none";

  try {
    await deleteNotification();
  } catch (error) {
    console.error("Error al eliminar notificacion:", error);
    alert("Hubo un error al eliminar la notificacion. Intenta de nuevo.");
  } finally {
    loading.style.display = "none";
    deleteModal.style.display = "flex";
    window.location.href = 'notificaciones.html';
  }
});

export const deleteNotification = async () => {

  const response = await NotificationService.deleteAllReadNotifications();

  if (response.status != 204) {
    const errorDetails = await response.text();
    console.error(
      "Error en la eliminacion de la notificacion:",
      response.status,
      response.statusText,
      errorDetails
    );
    alert(`Error al eliminar la notificacion: ${errorDetails}`);
    return false;
  }

  console.log("Notificacion eliminada con éxito");
  alert("Notificacion eliminada con éxito");
  return true;
};