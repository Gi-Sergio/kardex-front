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

  document.getElementById("customerEmail").innerHTML = order.customerEmail;
  document.getElementById("product-name").innerText = capitalizeFirstLetter( order.product.name);
  document.getElementById("quantity").innerText = order.quantity;
  document.getElementById("product-price").innerText = order.product.price;
  document.getElementById("totalPrice").innerText = order.totalPrice;
  document.getElementById("numberOrder").innerText = order.numberOrder;

  const img = document.getElementById("imageUrl");
  img.src = order.product.imageUrl || "/img/Icono K.png";
  img.alt = order.product.name || "Imagen por defecto";

  img.onerror = function () {
    img.src = "/img/Logo_Empresa.png";
  };

  document.getElementById("loading").style.display = "none";
  document.getElementById("order-card").style.display = "block";
};
