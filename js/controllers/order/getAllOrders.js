// js/controllers/getAllOrders.js
import OrderService from "../../services/OrderService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("orders-loading").style.display = "flex";
  document.getElementById("orders").style.display = "none";
  document.getElementById("no-orders").style.display = "none";
  document.getElementById("pagination").style.display = "none";

  try {
  await listOrders(currentPage);
  }catch(e) {
    console.error("Error al listar los pedidos", e);
    document.getElementById("orders-loading").style.display = "none";
    document.getElementById("orders").style.display = "none";
    document.getElementById("no-orders").style.display = "block";
    document.getElementById("pagination").style.display = "none";
    return;
  }
});

let currentPage = 0; // Página inicial
const pagesize = 15;


const listOrders = async (page = 0) => {
  const data = await OrderService.getAll(page, pagesize);
  if (
    !handleApiResponse(data, {
      noDataId: "no-orders",
      loadingId: "orders-loading",
      containerId: "orders",
    })
  )
    return;

  const orders = data.content || []; // Verificar si existe "content", si no, asignar un array vacío

  const ordersContainer = document.getElementById("orders");
  const paginationContainer = document.getElementById("pagination");

  ordersContainer.innerHTML = "";

  showOrders(orders);

  // Mostrar los botones de paginación
  showPagination(data.totalPages);

  document.getElementById("orders-loading").style.display = "none";
  ordersContainer.style.display = "flex";
  paginationContainer.style.display = "flex";
};

const showOrders = (orders) => {
  const ordersContainer = document.getElementById("orders");

  orders.forEach((order) => {
    // Crear contenedor principal
    const orderCard = document.createElement("div");
    orderCard.classList.add("receipt");

    // Nombre del producto
    const productName = document.createElement("p");
    productName.classList.add("shop-name");
    productName.textContent = order.product.name;

    // Información del proveedor y fecha
    const info = document.createElement("div");
    info.classList.add("info");

    const providerName = document.createElement("p");
    providerName.textContent = order.product.provider.companyName;

    const [date, time] = order.createdAt.split("T");
    const formattedTime = time.split(".")[0];

    const dateText = document.createElement("p");
    dateText.textContent = "Date: " + date;

    const timeText = document.createElement("p");
    timeText.textContent = "Time: " + formattedTime;

    info.append(providerName, dateText, timeText);

    // Tabla de productos
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    ["Producto", "Cantidad", "Precio"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);

    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    [
      order.product.name,
      order.quantity,
      `$${order.product.price.toLocaleString()}`,
    ].forEach((text) => {
      const td = document.createElement("td");
      td.textContent = text;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);

    table.append(thead, tbody);

    // Total
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total");

    const totalText = document.createElement("p");
    totalText.textContent = "Total:";

    const totalAmount = document.createElement("p");
    totalAmount.textContent = `$${order.totalPrice.toLocaleString()}`;

    totalDiv.append(totalText, totalAmount);

    // Línea vertical
    const lineVertical = document.createElement("div");
    lineVertical.classList.add("line-vertical");

    // Estado
    const estadoDiv = document.createElement("div");
    estadoDiv.classList.add("Estado");

    const estadoText = document.createElement("p");
    estadoText.textContent = "Estado:";

    const estadoValue = document.createElement("p");

    if(order.status.id === 1){
      estadoValue.id = "Estado-Proceso";
      estadoValue.textContent = "PEDIDO"
    }
    
    if(order.status.id === 2){
      estadoValue.id = "Estado-Despachado";
      estadoValue.textContent = "ENVIADO"
    }

    if(order.status.id === 3){
      estadoValue.id = "Estado-Transito";
      estadoValue.textContent = "EN TRANSITO"
    }

    if(order.status.id === 4){
      estadoValue.id = "Estado-Activo";
      estadoValue.textContent = "ENTREGADO"
    }

    if(order.status.id === 5){
      estadoValue.id = "Estado-Cancelado";
      estadoValue.textContent = "CANCELADO"
    }

    estadoDiv.append(estadoText, estadoValue);

    // Mensaje de agradecimiento
    const thanks = document.createElement("p");
    thanks.classList.add("thanks");
    thanks.textContent = "¡Gracias por comprar con NOSOTROS!";

    // Estructurar el recibo
    orderCard.append(productName, info, table, totalDiv, lineVertical, estadoDiv, thanks);
    ordersContainer.appendChild(orderCard);
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
      listOrders(currentPage);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Siguiente";
  nextButton.disabled = currentPage === totalPages - 1;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      listOrders(currentPage);
    }
  });

  // Agregar los botones de paginación
  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(nextButton);

  // Mostrar los botones de paginación
  paginationContainer.style.display = "flex";
};
