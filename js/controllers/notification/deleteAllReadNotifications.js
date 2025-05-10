import NotificationService from "../../services/NotificationService.js";

const btnDeleteAll = document.getElementById("btn-delete-read-notification");

btnDeleteAll.addEventListener("click", async function () {
  const confirmacion = confirm(`¿Estás seguro de eliminar las notificaciones ya leidas?`);
  if (!confirmacion) return;

  await deleteAllNotifications();
});

const deleteAllNotifications = async () => {
  const response = await NotificationService.deleteAllReadNotifications();

  if (response.status != 204) {
    const errorDetails = await response.text();
    console.error(
      "Error en la eliminacion de la notificacion:",
      response.status,
      response.statusText,
      errorDetails
    );
  }
  window.location.reload();
  
  console.log("Notificacion eliminada con éxito");
  alert("Notificacion eliminada con éxito");
};
