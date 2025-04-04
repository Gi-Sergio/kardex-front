// js/controllers/getAllProducts.js
import ProductService from "../../services/ProductService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.js';

const params = new URLSearchParams(window.location.search);
const providerId = params.get("id");
let total = 0;

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("loading-products").style.display = "flex";
  document.getElementById("products").style.display = "none";
  document.getElementById("no-products").style.display = "none";
  document.getElementById("pagination").style.display = "none";

  listProducts(currentPage);
});

let currentPage = 0; // Página inicial

const listProducts = async (page = 0) => {
  const data = await ProductService.getAllByProviderId(providerId, page);

  if (
    !handleApiResponse(data, {
      noDataId: "no-products",
      loadingId: "loading-products",
      containerId: "products",
    })
  )
    return;

  const products = data.content || []; // Verificar si existe "content", si no, asignar un array vacío

  const productsContainer = document.getElementById("products");
  const paginationContainer = document.getElementById("pagination");

  productsContainer.innerHTML = ""; // Limpiar productos previos

  // Mostrar los productos
  showProducts(products);

  // Mostrar los botones de paginación
  showPagination(data.totalPages);

  // Mostrar los productos y ocultar el mensaje de carga
  document.getElementById("loading-products").style.display = "none";
  productsContainer.style.display = "flex";
  paginationContainer.style.display = "flex";
  
};

// Función para mostrar los productos
const showProducts = (products) => {
  const productsContainer = document.getElementById("products");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = product.imageUrl || "/img/Icono-K.png";
    img.alt = product.name || "Imagen por defecto";
    img.classList.add("card-img");

    // Si la imagen no carga, se reemplaza por una imagen por defecto
    img.onerror = function () {
      img.src = "/img/Icono-K.png";
    };

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    const textTitle = document.createElement("p");
    textTitle.classList.add("text-title");
    textTitle.textContent = capitalizeFirstLetter(product.name); // Nombre del producto

    const textBody = document.createElement("p");
    textBody.classList.add("text-body");
    textBody.textContent = product.description; // Descripción del producto

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    const price = document.createElement("span");
    price.classList.add("text-title");
    price.textContent = `$${product.price}`; // Precio del producto

    const cardButton = document.createElement("div");
    cardButton.classList.add("card-button");

    const svgIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgIcon.setAttribute("viewBox", "0 0 20 20");
    svgIcon.classList.add("svg-icon", "open-modal-btn");
    svgIcon.onclick = () => openModal("pedidoModal", product.id);

    const path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path1.setAttribute(
      "d",
      "M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"
    );

    const path2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path2.setAttribute(
      "d",
      "M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"
    );

    const path3 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path3.setAttribute(
      "d",
      "M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"
    );

    // Estructurar elementos
    svgIcon.append(path1, path2, path3);
    cardButton.appendChild(svgIcon);
    cardFooter.append(price, cardButton);
    cardInfo.append(textTitle, textBody);
    card.append(img, cardInfo, cardFooter);
    productsContainer.appendChild(card);
    total++;
  });

  document.getElementById("total").textContent = total;
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

  // Agregar los botones de paginación
  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(nextButton);

  // Mostrar los botones de paginación
  paginationContainer.style.display = "flex";
};
