// js/controllers/getAllProviders.js
import ProviderService from "../../services/ProviderService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.js';

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("loading").style.display = "flex";
  document.getElementById("providers").style.display = "none";
  document.getElementById("no-providers").style.display = "none";
  document.getElementById("pagination").style.display = "none";

  listProviders(currentPage);
});

let currentPage = 0; 
const pagesize = 15;// tamaño de pagina

const listProviders = async (page = 0) => {
  const data = await ProviderService.getAll(page, pagesize);

  if (
    !handleApiResponse(data, {
      noDataId: "no-providers",
      loadingId: "loading",
      containerId: "providers",
    })
  )
    return;

  const providers = data.content || []; // Verificar si existe "content", si no, asignar un array vacío

  const providersContainer = document.getElementById("providers");
  const paginationContainer = document.getElementById("pagination");

  providersContainer.innerHTML = ""; // Limpiar provideros previos

  // Mostrar los provideros
  showProviders(providers);

  // Mostrar los botones de paginación
  showPagination(data.totalPages);

  // Mostrar los provideros y ocultar el mensaje de carga
  document.getElementById("loading").style.display = "none";
  providersContainer.style.display = "flex";
  paginationContainer.style.display = "flex";
};

// Función para mostrar los provideros
const showProviders = (providers) => {
  const providersContainer = document.getElementById("providers");

  providers.forEach((provider) => {
    const container = document.createElement("div");
    container.classList.add("container-card");

    const providerCard = document.createElement("div");
    providerCard.classList.add("container-card_content");

    const id = document.createElement("h2");
    id.classList.add("numero-proveedor");
    id.textContent = provider.id;

    const name = document.createElement("h3");
    name.textContent = capitalizeFirstLetter(provider.companyName);

    const description = document.createElement("p");
    description.textContent = provider.description;

    const btnVerMaS = document.createElement("button");
    btnVerMaS.classList.add("a-2");
    btnVerMaS.textContent = "Ver Proveedor";
    btnVerMaS.addEventListener("click", () => {
      window.location.href = `ProductosProveedor.html?id=${provider.id}`;
    });
    // Agregar los elementos a la tarjeta
    providerCard.append(id, name, description, btnVerMaS);
    container.append(providerCard);

    // Agregar la tarjeta al contenedor de provideros
    providersContainer.appendChild(container);
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
  prevButton.textContent = "Anterior  ";
  prevButton.disabled = currentPage === 0;
  prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      listProviders(currentPage);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Siguiente";
  nextButton.disabled = currentPage === totalPages - 1;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      listProviders(currentPage);
    }
  });

  // Agregar los botones de paginación
  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(nextButton);

  // Mostrar los botones de paginación
};