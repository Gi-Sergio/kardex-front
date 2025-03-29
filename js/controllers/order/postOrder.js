import OrderService from "../../services/OrderService.js";

const form = document.getElementById("order-save-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  let loading = document.getElementById("create-loading");
  loading.style.display = "flex";
  form.style.display = "none";

  try {
    const success = await createOrder(); // ⬅️ Captura si fue exitoso
    if (success) {
      openModal("confirmacionModal", 1); // ⬅️ Solo si todo salió bien
    }
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    alert("Hubo un error al crear el pedido. Intenta de nuevo.");
  } finally {
    loading.style.display = "none";
    form.style.display = "block";
  }
});

let createOrder = async () => {

  const order = {
    productId: parseInt(document.getElementById("productId").value, 10),
    quantity: parseInt(document.getElementById("quantity").value, 10),
  };

  const response = await OrderService.create(order);

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error(
      "Error en la creación de el pedido:",
      response.status,
      response.statusText,
      errorDetails
    );
    alert(`Error al crear el pedido: ${errorDetails}`);
    return false;
  }

  console.log("Pedido creado con éxito");
  // alert("Pedido creado con éxito");
  return true;
};