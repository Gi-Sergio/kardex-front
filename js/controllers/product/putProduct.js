import ProductService from "../../services/ProductService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";

// Obtener los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

document.addEventListener("DOMContentLoaded", async function () {
  await getProduct();
});

// ✅ Función para obtener y mostrar los datos del producto en el formulario
let getProduct = async () => {
  const product = await ProductService.getById(productId);

  if (
    !handleApiResponse(product, {
      noDataId: "no-products",
      loadingId: "loading",
      containerId: "product-card",
    })
  ) {
    return;
  }

  document.getElementById("product-name-edit").value = product.name;
  document.getElementById("product-quantity-edit").value = product.quantity;
  document.getElementById("product-price-edit").value = product.price;
  document.getElementById("product-description-edit").value =
    product.description;

  const img = document.getElementById("product-image-edit");
  img.src = product.imageUrl || "/img/Logo_Empresa.png";
  img.alt = product.name || "Imagen por defecto";

  img.onerror = function () {
    img.src = "/img/Logo_Empresa.png";
  };
};

// Obtiene el formulario
const form = document.getElementById("product-update-form");

// ✅ Escucha el evento submit del formulario
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Previene el envío tradicional del formulario

  let loading = document.getElementById("update-loading");
  loading.style.display = "block";
  form.style.display = "none";

  try {
    const success = await updateProduct();
    if (success) {
      showSuccessModal(); // Muestra la alerta de éxito
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    alert("Hubo un error al actualizar el producto. Intenta de nuevo.");
    form.style.display = "flex"; // Muestra nuevamente el formulario si hay error
  } finally {
    loading.style.display = "none";
  }
});

// ✅ Función para actualizar el producto
let updateProduct = async () => {
  const formData = new FormData();

  formData.append("name", document.getElementById("product-name-edit").value);
  formData.append(
    "quantity",
    document.getElementById("product-quantity-edit").value
  );
  formData.append("price", document.getElementById("product-price-edit").value);
  formData.append(
    "description",
    document.getElementById("product-description-edit").value
  );

  const imageInput = document.getElementById("product-image-edit");
  if (imageInput.files.length > 0) {
    formData.append("file", imageInput.files[0]);
  }

  const response = await ProductService.update(productId, formData);

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

// ✅ Función para mostrar la nueva alerta de éxito
function showSuccessModal() {
  const successModal = document.getElementById("successModal");
  const closeSuccessButton = document.getElementById("btn-view-products");

  successModal.style.display = "flex"; // Muestra la alerta

  closeSuccessButton.addEventListener("click", function () {
    successModal.style.display = "none";
    window.location.reload(); // Recarga la página solo después de cerrar la alerta
  });
}
