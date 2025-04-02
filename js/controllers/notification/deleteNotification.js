import NotificationService from "../../services/NotificationService.js";

export const deleteNotification = async (notificationId, notificationLi) => {
  const confirmacion = confirm(`¿Estás seguro de eliminar la notificacion?`);
  if (!confirmacion) return;

  const response = await NotificationService.delete(notificationId);

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

  notificationLi.style.opacity = "0";
  setTimeout(() => {
    notificationLi.remove();
  }, 300);
};
