// js/controllers/getAllProducts.js
import ProductService from "../../services/ProductService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("loading").style.display = "flex";
  document.getElementById("products").style.display = "none";
  document.getElementById("no-products").style.display = "none";
  document.getElementById("pagination").style.display = "none";

  listProducts(currentPage);
});

let currentPage = 0;
const pagesize = 15;

const listProducts = async (page = 0) => {
  const data = await ProductService.getAll(page, pagesize);

  if (
    !handleApiResponse(data, {
      noDataId: "no-products",
      loadingId: "loading",
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
  document.getElementById("loading").style.display = "none";
  productsContainer.style.display = "flex";
  paginationContainer.style.display = "flex";
};

// Función para mostrar los productos
const showProducts = (products) => {
  const productsContainer = document.getElementById("products");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const name = document.createElement("h3");
    name.textContent = product.name;

    const img = document.createElement("img");
    img.src = product.imageUrl || "/img/Logo_Empresa.png";
    img.alt = product.name || "Imagen por defecto";

    // Si la imagen no carga, se reemplaza por una imagen por defecto
    img.onerror = function () {
      img.src = "/img/Logo_Empresa.png";
    };

    const status = document.createElement("p");
    status.textContent = product.status ? "Disponible" : "No disponible";
    status.classList.add(product.status ? "disponible" : "no-disponible");

    const btnVerMaS = document.createElement("button");
    btnVerMaS.textContent = "Ver más";
    btnVerMaS.addEventListener("click", () => {
      window.location.href = `producto.html?id=${product.id}`;
    });
    // Agregar los elementos a la tarjeta
    productCard.append(name, img, status, btnVerMaS);

    // Agregar la tarjeta al contenedor de productos
    productsContainer.appendChild(productCard);
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
      listProducts(currentPage);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Siguiente";
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
