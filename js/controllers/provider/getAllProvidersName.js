import ProviderService from "../../services/ProviderService.js";

document.addEventListener("DOMContentLoaded", async () => {
  listProvidersName();
});

const listProvidersName = async() => {
  const providers = await ProviderService.getAllProvidersName();
  populateProviderSelect(providers);
};

// Función para llenar el select con los IDs de los proveedores
const populateProviderSelect = (providers) => {
  const providerSelect = document.getElementById("providerSelect");

  // Limpiar opciones previas
  providerSelect.innerHTML = '<option value="">Seleccione un proveedor</option>';

  providers.forEach((provider) => {
    const option = document.createElement("option");
    option.value = provider.id;  // Se guarda el ID del proveedor
    option.textContent = `${provider.companyName}`;
    providerSelect.appendChild(option);
  });
};
