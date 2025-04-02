import OrderService from "../../services/OrderService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";

const params = new URLSearchParams(window.location.search);
const orderId = params.get("idOrder");

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("orders-history-loading").style.display = "flex";
  document.getElementById("orders-history").style.display = "none";
  document.getElementById("no-orders-history").style.display = "none";

  try {
    await listOrdersHistory();
  } catch (e) {
    console.error("Error al listar los pedidos", e);
    document.getElementById("orders-history-loading").style.display = "none";
    document.getElementById("orders-history").style.display = "none";
    document.getElementById("no-orders-history").style.display = "block";
  }
});

const listOrdersHistory = async () => {
  const data = await OrderService.getOrderStatusHistory(orderId);

  if (
    !handleApiResponse(data, {
      noDataId: "no-orders-history",
      loadingId: "orders-history-loading",
      containerId: "orders-history",
    })
  ) return;

  const ordersHistory = data || []; 

  const ordersContainer = document.getElementById("orders-history");
  ordersContainer.innerHTML = "";

  showOrders(ordersHistory);

  document.getElementById("orders-history-loading").style.display = "none";
  ordersContainer.style.display = "block";
};
// Función para formatear la fecha
function formatDate(date) {
  const months = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun", 
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Función para formatear la hora
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutes}`;
}

const showOrders = (orders) => {
  const timelineContainer = document.getElementById("orders-history"); 
  timelineContainer.innerHTML = "";
  
  // Ordenar eventos del más reciente al más antiguo
  const sortedEvents = [...orders].reverse();
  
  sortedEvents.forEach((order) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item completed";

      const date = new Date(order.changedAt); // Convertir la fecha de la API

      const dateElement = document.createElement("div");
      dateElement.className = "timeline-date";
      dateElement.textContent = `${formatDate(date)} ${formatTime(date)}`; // Aplicar formato

      const contentElement = document.createElement("div");
      contentElement.className = "timeline-content";
      contentElement.textContent = getStatusText(order.statusId);
      if (order.statusId === 5){
        contentElement.style.color = "red";
      }

      timelineItem.appendChild(dateElement);
      timelineItem.appendChild(contentElement);
      timelineContainer.appendChild(timelineItem);
  });
};

const getStatusText = (statusId) => {
  const statusMap = {
    1: "Pedido realizado",
    2: "Enviado",
    3: "En tránsito",
    4: "Entregado",
    5: "Cancelado",
  };
  return statusMap[statusId] || "Estado Desconocido";
};
