import ProviderService from "../../services/ProviderService.js";

const form = document.getElementById("provider-save-form");
document.getElementById("errorImagen").style.display = "none";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  let loading = document.getElementById("create-loading");
  loading.style.display = "flex";
  form.style.display = "none";


  await createProvider(); // ⬅️ Captura si fue exitoso

  loading.style.display = "none";
  form.style.display = "flex";
});

let createProvider = async () => {
  const formData = new FormData();

  formData.append("name", document.getElementById("name").value);
  formData.append("companyName", document.getElementById("companyName").value || "0");
  formData.append("email", document.getElementById("email").value);
  formData.append("phone", document.getElementById("phone").value);
  formData.append("status", "true");
  formData.append("description", document.getElementById("description").value);

  // Verifica que se haya seleccionado una imagen
  const imageFile = document.getElementById("image").files[0];
  if (imageFile) {
    formData.append("image", imageFile);
  } else {
    document.getElementById("errorImagen").style.display = "block";
  }

  const response = await ProviderService.create(formData);

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error(
      "Error en la creación del proveedor:",
      response.status,
      response.statusText,
      errorDetails
    );
  }

  console.log("Proveedor creado con éxito");
  showSuccessModal()
};
