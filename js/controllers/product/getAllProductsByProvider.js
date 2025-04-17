import ProductService from "../../services/ProductService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.js";

const params = new URLSearchParams(window.location.search);
const providerId = params.get("id");
let currentPage = 0;

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loading-products").style.display = "flex";
  document.getElementById("products").style.display = "none";
  document.getElementById("no-products").style.display = "none";
  document.getElementById("pagination").style.display = "none";

  listProducts(currentPage);
});

const listProducts = async (page = 0) => {
  const data = await ProductService.getAllByProviderId(providerId, page);

  if (
    !handleApiResponse(data, {
      noDataId: "no-products",
      loadingId: "loading-products",
      containerId: "products",
    })
  ) return;

  const products = data.content || [];
  const productsContainer = document.getElementById("products");
  const paginationContainer = document.getElementById("pagination");

  productsContainer.innerHTML = "";
  showProducts(products);
  showPagination(data.totalPages);

  document.getElementById("loading-products").style.display = "none";
  productsContainer.style.display = "flex";
  paginationContainer.style.display = "flex";
};

const showProducts = (products) => {
  const productsContainer = document.getElementById("products");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = product.imageUrl || "/img/Icono-K.png";
    img.alt = product.name || "Imagen por defecto";
    img.classList.add("card-img");
    img.onerror = () => (img.src = "/img/Icono-K.png");

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    const textTitle = document.createElement("p");
    textTitle.classList.add("text-title");
    textTitle.textContent = capitalizeFirstLetter(product.name);

    const textBody = document.createElement("p");
    textBody.classList.add("text-body");
    textBody.textContent = product.description;

    const price = document.createElement("span");
    price.classList.add("text-title");
    price.textContent = `$${product.price}`;

    const addToCartContainer = document.createElement("div");
    addToCartContainer.classList.add("add-to-cart-container");

    const addButton = document.createElement("button");
    addButton.textContent = "Añadir al carrito";
    addButton.classList.add("btn-add");

    const qtyControls = document.createElement("div");
    qtyControls.classList.add("qty-controls");
    qtyControls.style.display = "none";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "−";
    minusBtn.classList.add("btn-qty");

    const qtyDisplay = document.createElement("span");
    qtyDisplay.textContent = "1";
    qtyDisplay.classList.add("qty-display");

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.classList.add("btn-qty");

    qtyControls.append(minusBtn, qtyDisplay, plusBtn);
    addToCartContainer.append(addButton, qtyControls);

    let cantidad = 1;

    addButton.addEventListener("click", () => {
      addButton.style.display = "none";
      qtyControls.style.display = "flex";
    });

    plusBtn.addEventListener("click", () => {
      cantidad++;
      qtyDisplay.textContent = cantidad;
    });

    minusBtn.addEventListener("click", () => {
      if (cantidad > 1) {
        cantidad--;
        qtyDisplay.textContent = cantidad;
      } else {
        cantidad = 1;
        qtyDisplay.textContent = cantidad;
        qtyControls.style.display = "none";
        addButton.style.display = "inline-block";
      }
    });

    const confirmarBtn = document.createElement("button");
    confirmarBtn.textContent = "✓";
    confirmarBtn.classList.add("btn-confirm");

    confirmarBtn.addEventListener("click", () => {
      const productoExistente = carrito.find(p => p.nombre === product.name);

      if (productoExistente) {
        productoExistente.cantidad += cantidad;
      } else {
        carrito.push({
          nombre: product.name,
          precio: Number(product.price), // Asegura que sea número
          cantidad: cantidad,
          imagen: product.imageUrl || "/img/Icono-K.png",
        });
      }

      actualizarContadores();

      cantidad = 1;
      qtyDisplay.textContent = "1";
      qtyControls.style.display = "none";
      addButton.style.display = "inline-block";
    });

    qtyControls.appendChild(confirmarBtn);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    cardFooter.appendChild(addToCartContainer);

    cardInfo.append(textTitle, textBody, price);
    card.append(img, cardInfo, cardFooter);
    productsContainer.appendChild(card);
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
      listProducts(currentPage);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Siguiente";
  nextButton.classList.add("button-siguiente");
  nextButton.disabled = currentPage === totalPages - 1;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      listProducts(currentPage);
    }
  });

  paginationContainer.append(prevButton, nextButton);
  paginationContainer.style.display = "flex";
};

function actualizarContadores() {
  const totalProductos = carrito.reduce((sum, p) => sum + p.cantidad, 0);

  const contadorCarrito = document.getElementById("contador-carrito");
  const contadorModal = document.getElementById("contador");

  if (contadorCarrito) contadorCarrito.textContent = totalProductos;
  if (contadorModal) contadorModal.textContent = totalProductos;
}

window.mostrarCarrito = function () {
  const modal = document.getElementById("modalCarrito");
  const lista = document.getElementById("lista-carrito");
  const totalElement = document.getElementById("total");

  lista.innerHTML = "";
  let totalPagar = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("item-carrito");
    item.innerHTML = `
      <p><strong>${capitalizeFirstLetter(producto.nombre)}</strong></p>
      <p>${producto.cantidad}x $${producto.precio.toFixed(2)}</p>
      <p>$${(producto.cantidad * parseFloat(producto.precio)).toFixed(2)}</p>
      <button onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    lista.appendChild(item);
    totalPagar += producto.cantidad * parseFloat(producto.precio); // ¡Cambio importante aquí!
  });

  totalElement.textContent = `$${totalPagar.toFixed(2)}`;
  modal.style.display = "flex";
};

window.cerrarCarrito = function () {
  document.getElementById("modalCarrito").style.display = "none";
};

window.eliminarDelCarrito = function (index) {
  carrito.splice(index, 1);
  mostrarCarrito();
  actualizarContadores();
};
