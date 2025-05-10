import ProductService from "../../services/ProductService.js";

const form = document.getElementById("product-save-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  let loading = document.getElementById("create-loading");
  loading.style.display = "flex";
  form.style.display = "none";

  try {
    const success = await createProduct(); // ⬅️ Captura si fue exitoso
    if (success) {
      showSuccessModal(); // ⬅️ Solo si todo salió bien
    }
  } catch (error) {
    console.error("Error al crear producto:", error);
    alert("Hubo un error al crear el producto. Intenta de nuevo.");
  } finally {
    loading.style.display = "none";
    form.style.display = "flex";
  }
});

let createProduct = async () => {
  const formData = new FormData();

  formData.append("name", document.getElementById("name").value);
  formData.append("quantity", document.getElementById("quantity").value || "0");
  formData.append("price", document.getElementById("price").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("providerId", document.getElementById("providerSelect").value);

  // Verifica que se haya seleccionado una imagen
  const imageFile = document.getElementById("image").files[0];
  if (imageFile) {
    formData.append("image", imageFile);
  } else {
    document.getElementById("errorImagen").style.display = "block";
    return false;
  }

  const response = await ProductService.create(formData);

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error(
      "Error en la creación del producto:",
      response.status,
      response.statusText,
      errorDetails
    );
    alert(`Error al crear el producto: ${errorDetails}`);
    return false;
  }

  return true;
};
