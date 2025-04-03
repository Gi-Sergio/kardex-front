import NotificationService from "../../services/NotificationService.js";

export const deleteNotification = async (notificationId, notificationLi) => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (!result.isConfirmed) return;

  try {
    const response = await NotificationService.delete(notificationId);

    if (response.status !== 204) {
      const errorDetails = await response.text();
      console.error("Error en la eliminación:", response.status, response.statusText, errorDetails);
      return Swal.fire("Error", "No se pudo eliminar la notificación", "error");
    }

    Swal.fire("Eliminado", "La notificación se eliminó con éxito", "success");

    // Animación para eliminar la notificación sin recargar
    notificationLi.style.transition = "opacity 0.5s";
    notificationLi.style.opacity = "0";
    setTimeout(() => notificationLi.remove(), 500);

  } catch (error) {
    console.error("Error inesperado:", error);
    Swal.fire("Error", "Ocurrió un error inesperado", "error");
  }
};
