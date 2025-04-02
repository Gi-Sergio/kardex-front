import NotificationService from "../../services/NotificationService.js";

export const updateNotificationStatus = async (
  notificationId,
  notificationLi
) => {
  const status = 2;

  const response = await NotificationService.patch(notificationId, status);

  if (response.status != 204) {
    const errorDetails = await response.text();
    console.error(
      "Error en la actualizacion del notificacion:",
      response.status,
      response.statusText,
      errorDetails
    );
  }

  notificationLi.classList.add("read");

  window.location.reload();

  console.log("notificacion actualizada con éxito");
};
