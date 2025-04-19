import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";
import CartService from "../../services/CartService.js";
import { removeItemCart } from "../cart/removeItemCart.js"

document.addEventListener("DOMContentLoaded", async () => {
  await getAllCart();
});

const getAllCart = async () => {
  const lista = document.getElementById("lista-carrito");
  const totalElement = document.getElementById("totalCarrito");

  lista.innerHTML = "";

  const cart = await CartService.getAll();

  let totalProducts = 0;

  cart.items.forEach((item) => {
    const itemDiv = crearItemCarrito(item);
    lista.appendChild(itemDiv);
    totalProducts++;
  });

  totalElement.textContent = `${parseFloat(cart.totalPrice).toFixed(2)}`;

  const contadorCarrito = document.getElementById("contador-carrito");
  const contadorModal = document.getElementById("contador");

  if (contadorCarrito) contadorCarrito.textContent = totalProducts;
  if (contadorModal) contadorModal.textContent = totalProducts;

  localStorage.setItem("cartId", cart.id);
};

function crearItemCarrito(item) {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item-carrito");

  const productoDiv = document.createElement("div");
  productoDiv.style.display = "flex";

  const nombreP = document.createElement("p");
  const nombreStrong = document.createElement("strong");
  nombreStrong.textContent = capitalizeFirstLetter(item.product.name);
  nombreP.appendChild(nombreStrong);

  const cantidadPrecioP = document.createElement("p");
  cantidadPrecioP.textContent = `${item.quantity}x $${parseFloat(
    item.product.price
  ).toFixed(2)}`;

  const totalP = document.createElement("p");
  const total = item.quantity * parseFloat(item.product.price);
  totalP.textContent = `$${total.toFixed(2)}`;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "❌";
  btnEliminar.style.background = "#fff"
  btnEliminar.onclick = async function () {
    await removeItemCart(item.product.id)
  };

  productoDiv.append(nombreP, cantidadPrecioP, totalP, btnEliminar);
  itemDiv.appendChild(productoDiv);

  return itemDiv;
}
