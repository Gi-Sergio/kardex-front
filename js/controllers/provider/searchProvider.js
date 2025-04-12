import ProviderService from "../../services/ProviderService.js";
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter.js';

let page = 0;
const pagesize = 9999;

document.getElementById("searchProvider").addEventListener("input", async (event) => {
  let filter = event.target.value.toLowerCase(); 
  let resultsContainer = document.getElementById("providers");
  let paginationContainer = document.getElementById("pagination");

  // 🔹 Ocultar la paginación mientras se filtra
  paginationContainer.style.display = "none";

  resultsContainer.innerHTML = ""; 

  const data = await ProviderService.getAll(page, pagesize);
  const providers = data.content || [];

  let filteredProviders = providers.filter(
    (provider) => provider.companyName?.toLowerCase().includes(filter)
  );

  let existingNoDataMessage = document.getElementById("no-data-message");

  if (filteredProviders.length === 0) {
    if (!existingNoDataMessage) {
      const noDataMessage = document.createElement("p");
      noDataMessage.textContent = "No hay proveedores disponibles con este nombre";
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

  filteredProviders.forEach((provider) => {
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

    providerCard.append(id, name, description, btnVerMaS);
    container.append(providerCard);
    resultsContainer.appendChild(container);
  });

  // 🔹 Si el usuario borra el filtro, mostrar la paginación
  if (filter.trim() === "") {
    paginationContainer.style.display = "flex";
  }
});
