import NotificationService from "../../services/NotificationService.js";

document.addEventListener("DOMContentLoaded", function () {
  const btnDeleteAll = document.getElementById("btn-delete-read-notification");
  const notificationsList = document.getElementById("notifications");

  // Habilita el botón si hay notificaciones en la lista
  if (notificationsList.children.length > 0) {
    btnDeleteAll.removeAttribute("disabled");
  }

  btnDeleteAll.addEventListener("click", async function () {
    console.log("Botón de eliminar todas presionado");

    const result = await Swal.fire({
      title: "¿Eliminar todas las notificaciones leídas?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar todas",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      console.log("Enviando solicitud para eliminar notificaciones...");

      const response = await NotificationService.deleteAllReadNotifications();

      if (response.status !== 204) {
        const errorDetails = await response.text();
        console.error("Error en la eliminación:", response.status, response.statusText, errorDetails);
        return Swal.fire("Error", "No se pudieron eliminar las notificaciones", "error");
      }

      console.log("Notificaciones eliminadas correctamente");

      Swal.fire("Eliminadas", "Todas las notificaciones leídas han sido eliminadas", "success")
        .then(() => window.location.reload());

    } catch (error) {
      console.error("Error inesperado:", error);
      Swal.fire("Error", "Ocurrió un error inesperado", "error");
    }
  });
});
