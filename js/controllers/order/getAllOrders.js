import OrderService from "../../services/OrderService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";
import { generateInvoicePDF } from "../../utils/generateInvoice.js"

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("orders-loading").style.display = "flex";
  document.getElementById("orders").style.display = "none";
  document.getElementById("no-orders").style.display = "none";
  document.getElementById("pagination").style.display = "none";

  try {
    await listOrders(currentPage);
  } catch (e) {
    console.error("Error al listar los pedidos", e);
    document.getElementById("orders-loading").style.display = "none";
    document.getElementById("orders").style.display = "none";
    document.getElementById("no-orders").style.display = "block";
    document.getElementById("pagination").style.display = "none";
    return;
  }
});

let currentPage = 0;
const pageSize = 6;

const listOrders = async (page = 0) => {
  const data = await OrderService.getAll(page, pageSize);
  if (
    !handleApiResponse(data, {
      noDataId: "no-orders",
      loadingId: "orders-loading",
      containerId: "orders",
    })
  ) return;

  const orders = data.content || [];

  const ordersContainer = document.getElementById("orders");
  const paginationContainer = document.getElementById("pagination");

  ordersContainer.innerHTML = "";
  showOrders(orders);

  showPagination(data.totalPages);

  document.getElementById("orders-loading").style.display = "none";
  ordersContainer.style.display = "flex";
  paginationContainer.style.display = "flex";
};

const showOrders = (orders) => {
  const ordersContainer = document.getElementById("orders");

  orders.forEach((order) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("receipt");

    const orderNumber = document.createElement("p");
    orderNumber.classList.add("shop-name");
    orderNumber.textContent = `Pedido Nº: ${order.numberOrder}`;
    orderCard.appendChild(orderNumber);

    const info = document.createElement("div");
    info.classList.add("info");

    const [date, time] = order.createdAt.split("T");
    const formattedTime = time.split(".")[0];

    const dateText = document.createElement("p");
    dateText.textContent = "Fecha: " + date;

    const timeText = document.createElement("p");
    timeText.textContent = "Hora: " + formattedTime;

    info.append(dateText, timeText);
    orderCard.appendChild(info);

    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    ["Producto", "Cantidad", "Precio", "Proveedor"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);

    const tbody = document.createElement("tbody");

    order.items.forEach((item) => {
      const tr = document.createElement("tr");

      const productName = capitalizeFirstLetter(item.product.name);
      const quantity = item.quantity;
      const price = `$${item.product.price.toLocaleString()}`;
      const provider = capitalizeFirstLetter(item.product.provider.companyName);

      [productName, quantity, price, provider].forEach((text) => {
        const td = document.createElement("td");
        td.textContent = text;
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.append(thead, tbody);
    orderCard.appendChild(table);

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total");

    const totalText = document.createElement("p");
    totalText.textContent = "Total:";

    const totalAmount = document.createElement("p");
    totalAmount.textContent = `$${order.totalAmount.toLocaleString()}`;

    totalDiv.append(totalText, totalAmount);
    orderCard.appendChild(totalDiv);

    const lineVertical = document.createElement("div");
    lineVertical.classList.add("line-vertical");
    orderCard.appendChild(lineVertical);

    const estadoDiv = document.createElement("div");
    estadoDiv.classList.add("Estado");

    const estadoText = document.createElement("p");
    estadoText.textContent = "Estado:";

    const estadoValue = document.createElement("p");
    const statusId = order.status.id;

    switch (statusId) {
      case 1:
        estadoValue.id = "Estado-Proceso";
        estadoValue.textContent = "PEDIDO";
        break;
      case 2:
        estadoValue.id = "Estado-Despachado";
        estadoValue.textContent = "ENVIADO";
        break;
      case 3:
        estadoValue.id = "Estado-Transito";
        estadoValue.textContent = "EN TRANSITO";
        break;
      case 4:
        estadoValue.id = "Estado-Activo";
        estadoValue.textContent = "ENTREGADO";
        break;
      case 5:
        estadoValue.id = "Estado-Cancelado";
        estadoValue.textContent = "CANCELADO";
        break;
      default:
        estadoValue.id = "Estado-Desconocido";
        estadoValue.textContent = "DESCONOCIDO";
    }

    estadoDiv.append(estadoText, estadoValue);
    orderCard.appendChild(estadoDiv);

    const thanks = document.createElement("p");
    thanks.classList.add("thanks");
    thanks.textContent = "¡Gracias por comprar con NOSOTROS!";
    orderCard.appendChild(thanks);

    const generateInvoiceBtn = document.createElement("button");
    generateInvoiceBtn.textContent = "Generar Factura";
    generateInvoiceBtn.classList.add("invoice-btn");
    generateInvoiceBtn.addEventListener("click", () => {
      // Aquí llamas a tu función para generar factura
      generateInvoicePDF(order); // Asumiendo que el pedido tiene un `id`
    });
    orderCard.appendChild(generateInvoiceBtn);

    ordersContainer.appendChild(orderCard);
  });
};

const showPagination = (totalPages) => {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

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

  paginationContainer.append(prevButton, nextButton);
  paginationContainer.style.display = "flex";
};
