import ProductService from "../../services/ProductService.js";

// Obtener los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Obtiene el formulario
const form = document.getElementById("product-patch-form");

// Escucha el evento submit del formulario
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Previene el envío tradicional del formulario

  let loading = document.getElementById("patch-loading");
  loading.style.display = "block";
  form.style.display = "none";

  try {
    const success = await updateProductQuantity();
    if (success) {
      showSuccessModal(); // Muestra la alerta de éxito
    }
  } catch (error) {
    console.error("Error al actualizar la cantidad:", error);
    alert("Hubo un error al actualizar la cantidad. Intenta de nuevo.");
    form.style.display = "flex"; // Muestra nuevamente el formulario si hay error
  } finally {
    loading.style.display = "none";
  }
});

// ✅ Función para actualizar la cantidad del producto
let updateProductQuantity = async () => {
  const quantity = document.getElementById("product-quantity-update").value;

  const response = await ProductService.patch(productId, quantity);

  if (response.status !== 204) {
    const errorDetails = await response.text();
    console.error(
      "Error en la actualización del producto:",
      response.status,
      response.statusText,
      errorDetails
    );
    alert(`Error al actualizar el producto: ${errorDetails}`);
    return false;
  }

  return true;
};

// ✅ Función para mostrar la alerta de éxito
function showSuccessModal() {
  const successModal = document.getElementById("successModal-2");
  const closeSuccessButton = document.getElementById("btn-view-products-2");

  successModal.style.display = "flex"; // Muestra la alerta

    // Cerrar la alerta y refrescar la página al cerrar
  closeSuccessButton.addEventListener("click", function () {
    successModal.style.display = "none";
    window.location.reload(); // Ahora sí recargamos la página después de cerrar la alerta
  });
}
