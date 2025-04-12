import OrderService from "../../services/OrderService.js";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";

let page = 0;
const pagesize = 9999;

document
  .getElementById("searchOrder")
  .addEventListener("input", async (event) => {
    let filter = event.target.value.toLowerCase();
    let resultsContainer = document.getElementById("orders");
    let paginationContainer = document.getElementById("pagination");

    // 🔹 Ocultar la paginación mientras se filtra
    paginationContainer.style.display = "none";

    resultsContainer.innerHTML = "";

    const data = await OrderService.getAll(page, pagesize);
    const orders = data.content || [];

    let filteredOrders = orders.filter((order) =>
      order.product.name?.toLowerCase().includes(filter)
    );

    let existingNoDataMessage = document.getElementById("no-data-message");

    if (filteredOrders.length === 0) {
      if (!existingNoDataMessage) {
        const noDataMessage = document.createElement("p");
        noDataMessage.textContent =
          "No hay órdenes de producto disponibles con este nombre";
        noDataMessage.classList.add("no-data-message");
        noDataMessage.id = "no-data-message";
        resultsContainer.appendChild(noDataMessage);
      }
      return;
    } else {
      if (existingNoDataMessage) {
        existingNoDataMessage.remove();
      }
    }

    filteredOrders.forEach((order) => {
      const orderCard = document.createElement("div");
      orderCard.classList.add("receipt");

      const productName = document.createElement("p");
      productName.classList.add("shop-name");
      productName.textContent = capitalizeFirstLetter(order.product.name);

      const info = document.createElement("div");
      info.classList.add("info");

      const providerName = document.createElement("p");
      providerName.textContent = capitalizeFirstLetter(
        order.product.provider.companyName
      );

      const [date, time] = order.createdAt.split("T");
      const formattedTime = time.split(".")[0];

      const dateText = document.createElement("p");
      dateText.textContent = "Date: " + date;

      const timeText = document.createElement("p");
      timeText.textContent = "Time: " + formattedTime;

      info.append(providerName, dateText, timeText);

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
        capitalizeFirstLetter(order.product.name),
        order.quantity,
        `$${order.product.price.toLocaleString()}`,
      ].forEach((text) => {
        const td = document.createElement("td");
        td.textContent = text;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);

      table.append(thead, tbody);

      const totalDiv = document.createElement("div");
      totalDiv.classList.add("total");

      const totalText = document.createElement("p");
      totalText.textContent = "Total:";

      const totalAmount = document.createElement("p");
      totalAmount.textContent = `$${order.totalPrice.toLocaleString()}`;

      totalDiv.append(totalText, totalAmount);

      const lineVertical = document.createElement("div");
      lineVertical.classList.add("line-vertical");

      const estadoDiv = document.createElement("div");
      estadoDiv.classList.add("Estado");

      const estadoText = document.createElement("p");
      estadoText.textContent = "Estado:";

      const estadoValue = document.createElement("p");

      switch (order.status.id) {
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
      }

      estadoDiv.append(estadoText, estadoValue);

      const thanks = document.createElement("p");
      thanks.classList.add("thanks");
      thanks.textContent = "¡Gracias por comprar con NOSOTROS!";

      orderCard.append(
        productName,
        info,
        table,
        totalDiv,
        lineVertical,
        estadoDiv,
        thanks
      );
      resultsContainer.appendChild(orderCard);
    });

    // 🔹 Si el usuario borra el filtro, mostrar la paginación nuevamente
    if (filter.trim() === "") {
      paginationContainer.style.display = "flex";
    }
  });
