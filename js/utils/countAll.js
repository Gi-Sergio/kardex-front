import ProductService from "../services/ProductService.js";
import ProviderService from "../services/ProviderService.js";
import OrderService from "../services/OrderService.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Llamadas a las funciones genéricas
  await listData(ProviderService, "totalProviders");
  await listData(ProductService, "totalProducts");
  await listData(OrderService, "totalOrders");
});

const page = 0;
const pagesize = 9999; // tamaño de página

// Función genérica para listar datos
const listData = async (service, elementId) => {
  const data = await service.getAll(page, pagesize);

  if (data.Message === "Your session has expired. Please log in again.") {
    alert(data.Message);
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }

  const items = data.content || [];

  let total = 0;
  items.forEach(() => {
    total++;
  });

  // Actualiza el elemento en el DOM
  document.getElementById(elementId).innerHTML = total;
};
