// js/controllers/getAllOrders.js
import NotificationService from "../../services/NotificationService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";
import { deleteNotification } from "./deleteNotification.js";
import{updateNotificationStatus} from "./patchStatusNotification.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("notifications-loading").style.display = "flex";
  document.getElementById("notifications").style.display = "none";
  document.getElementById("no-notifications").style.display = "none";
  document.getElementById("pagination").style.display = "none";

  listNotifications(currentPage);
});

let currentPage = 0; // Página inicial

const listNotifications = async (page = 0) => {
  const data = await NotificationService.getAll(page);

  if (
    !handleApiResponse(data, {
      noDataId: "no-notifications",
      loadingId: "notifications-loading",
      containerId: "notifications",
    })
  )
    return;

  const notifications = data.content || []; // Verificar si existe "content", si no, asignar un array vacío

  const notificationsContainer = document.getElementById("notifications");
  const paginationContainer = document.getElementById("pagination");

  notificationsContainer.innerHTML = "";

  showNotifications(notifications);

  // Mostrar los botones de paginación
  showPagination(data.totalPages);

  document.getElementById("notifications-loading").style.display = "none";
  notificationsContainer.style.display = "block";
  paginationContainer.style.display = "flex";
};

const showNotifications = (notifications) => {
  const notificationsContainer = document.getElementById("notifications");

  notifications.forEach((notification) => {
    // Crear el elemento <li> de la notificación
    const notificationLi = document.createElement("li");
    notificationLi.classList.add("notification");
    if(notification.status.id == 2){
      notificationLi.classList.add("read");
      // Habilitar el botón eliminar 
      document.getElementById('btn-delete-read-notification').disabled = false;
    }

    // Contenedor de contenido
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("notification-content");

    // Título de la notificación
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("notification-title");
    titleDiv.textContent = notification.type.typeName;

    // Mensaje de la notificación
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("notification-message");
    messageDiv.textContent = notification.message;

    // Agregar título y mensaje al contenedor de contenido
    contentDiv.append(titleDiv, messageDiv);

    // Contenedor de acciones
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("notification-actions");

    // Botón de marcar como leído
    const markReadBtn = document.createElement("button");
    markReadBtn.classList.add("action-btn", "mark-read");
    markReadBtn.textContent = "✓";
    markReadBtn.onclick = function () {
      updateNotificationStatus(notification.id, notificationLi);
    };

    // Botón de eliminar notificación
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("action-btn", "delete");
    deleteBtn.setAttribute("id", "delete-modal");
    deleteBtn.textContent = "×";
    deleteBtn.onclick = function () {
      deleteNotification(notification.id, notificationLi);
    };

    // Agregar botones al contenedor de acciones
    actionsDiv.append(markReadBtn, deleteBtn);

    // Agregar contenido y acciones a la notificación
    notificationLi.append(contentDiv, actionsDiv);
    notificationsContainer.appendChild(notificationLi);
  });
};

// Función para mostrar los botones de paginación
const showPagination = (totalPages) => {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  // Si solo hay una página, no mostrar los botones
  if (totalPages <= 1) {
    paginationContainer.style.display = "none";
    return;
  }

  const prevButton = document.createElement("button");
  prevButton.textContent = "Anterior";
  prevButton.disabled = currentPage === 0;
  prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      listNotifications(currentPage);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Siguiente";
  nextButton.disabled = currentPage === totalPages - 1;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      listNotifications(currentPage);
    }
  });

  // Agregar los botones de paginación
  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(nextButton);

  // Mostrar los botones de paginación
  paginationContainer.style.display = "flex";
};
