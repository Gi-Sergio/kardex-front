import OrderService from "../../services/OrderService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.js';

const params = new URLSearchParams(window.location.search);
const orderId = params.get("idOrder");
const tokenOrder = params.get("tokenOrder");

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("loading").style.display = "block";
  document.getElementById("order-card").style.display = "none";
  document.getElementById("no-order").style.display = "none";

  await getOrder();
});

let getOrder = async () => {
  const order = await OrderService.getById(orderId, tokenOrder);

  if (
    !handleApiResponse(order, {
      noDataId: "no-order",
      loadingId: "loading",
      containerId: "order-card",
    })
  ) {
    return;
  }

  document.getElementById("customerEmail").innerText = order.customerEmail;
  document.getElementById("numberOrder").innerText = order.numberOrder;
  document.getElementById("totalPrice").innerText = order.totalAmount;

  const itemsContainer = document.getElementById("items-container");
  itemsContainer.innerHTML = ""; // Limpiar contenido anterior

  order.items.forEach((item) => {
    const product = item.product;

    const producttd = document.createElement("td");
    producttd.textContent = capitalizeFirstLetter(product.name);

    const quantitytd = document.createElement("td");
    quantitytd.textContent = item.quantity;

    const pricetd = document.createElement("td");
    pricetd.textContent = `$${product.price.toLocaleString()}`;

    itemsContainer.append(producttd, quantitytd, pricetd);
  });

  document.getElementById("loading").style.display = "none";
  document.getElementById("order-card").style.display = "block";
};
