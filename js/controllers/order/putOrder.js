import OrderService from "../../services/OrderService.js";
// Datos iniciales del envío
const params = new URLSearchParams(window.location.search);
const orderId = params.get("idOrder");
const tokenOrder = params.get("tokenOrder");
let currentStatus = "Pedido realizado";

// Función para cambiar el estado del envío
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const order = await OrderService.getById(orderId, tokenOrder);
    const status =
      order.status.id === 1
        ? "Pedido realizado"
        : order.status.id === 2
        ? "Enviado"
        : order.status.id === 3
        ? "En tránsito"
        : order.status.id === 4
        ? "Entregado"
        : "Cancelado";
        currentStatus = status; // Estado desde la BD
    updateUI();
  } catch (error) {
    console.error("Error obteniendo estado del pedido:", error);
  }
});
window.changeStatus = async function (element) {
  const statusId = parseInt(element.getAttribute("data-status"));
  const newStatus =
    statusId === 2
      ? "Enviado"
      : statusId === 3
      ? "En tránsito"
      : statusId === 4
      ? "Entregado"
      : "Pedido realizado";
  const statusOrder = [
    "Pedido realizado",
    "Enviado",
    "En tránsito",
    "Entregado",
  ];

  // Confirmacion de actualizacion
  const confirmacion = confirm(`¿Estás seguro de actualizar el estado a ${newStatus}?`);
  if (!confirmacion) return;
  const currentIndex = statusOrder.indexOf(currentStatus);
  const newIndex = statusOrder.indexOf(newStatus);

  if (newIndex === currentIndex + 1) {
    try {
      await OrderService.update(orderId, statusId);
      currentStatus = newStatus;
      updateUI();
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  }
  window.location.reload();
};

function updateUI() {
  const statusOrder = [
    "Pedido realizado",
    "Enviado",
    "En tránsito",
    "Entregado",
    "Cancelado",
  ];
  const newIndex = statusOrder.indexOf(currentStatus);

  document.getElementById("current-status").textContent =
  currentStatus;

  const steps = document.querySelectorAll(".progress-step");
  steps.forEach((step, index) => {
    if (currentStatus === "Cancelado") {
      const cancelButton = document.getElementById("cancel-button");
      if (!cancelButton) return;
      cancelButton.disabled = true; // Deshabilitar botón para evitar múltiples clics
      cancelButton.style.cursor = "not-allowed"; // Cambiar el cursor para indicar que está inactivo
      step.classList.remove("active");
      step.classList.add("desactive");
      step.style.cursor = "not-allowed";
    } else if (index <= newIndex) {
      step.classList.add("active");
      step.style.cursor = "default"; // No clickeable
    } else if (index === newIndex + 1) {
      step.style.cursor = "pointer"; // Habilitar el siguiente
    } else {
      step.style.cursor = "not-allowed"; // Bloquear
    }
  });
  
}

window.cancelOrder = async function () {

  // Confirmación antes de cancelar el pedido
  const confirmacion = confirm("¿Estás seguro de actualizar el estado a Cancelado?");
  if (!confirmacion) return;
  const cancelButton = document.getElementById("cancel-button");
  if (!cancelButton) return;

  cancelButton.disabled = true; // Deshabilitar botón para evitar múltiples clics
  cancelButton.style.cursor = "not-allowed"; // Cambiar el cursor para indicar que está inactivo

  try {
    console.log("Cancelando pedido...");
    await OrderService.update(orderId, 5); // Suponiendo que 5 es el ID para "Cancelado"

    currentStatus = "Cancelado";
    updateUI(); // Actualizar la UI después de la cancelación

    console.log("Pedido cancelado exitosamente.");
  } catch (error) {
    console.error("Error cancelando pedido:", error);
    cancelButton.disabled = false; // Reactivar el botón si ocurre un error
    cancelButton.style.cursor = "pointer";
  }
  window.location.reload();
};
