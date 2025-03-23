import UserService from "../../services/UserService.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("user-save-form");
  const errorImagen = document.getElementById("errorImagen");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let loading = document.getElementById("create-loading");
    loading.style.display = "block";
    form.style.display = "none";

    try {
      await createUser();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Hubo un error al crear el usuario. Intenta de nuevo.");
    } finally {
      loading.style.display = "none";
      form.style.display = "block";
      window.location.reload();
    }
  });

  let createUser = async () => {
    const formData = new FormData();

    formData.append("username", document.getElementById("username").value);
    formData.append("companyName", document.getElementById("companyName").value || "0");
    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);

    // Obtener el campo de confirmación de contraseña
    const confirmPassword = document.getElementById("confirm-password").value;
    const password = document.getElementById("password").value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Verificar si se subió una imagen
    const imageFile = document.getElementById("image").files[0];
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      errorImagen.style.display = "block";
      return;
    }

    const response = await UserService.createUser(formData);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(
        "Error en la creación del usuario:",
        response.status,
        response.statusText,
        errorDetails
      );
      alert(`Error al crear el usuario: ${errorDetails}`);
      return;
    }

    console.log("Usuario creado con éxito");
    alert("Usuario creado con éxito");

    // Limpiar el formulario después del registro exitoso
    form.reset();
  };
});
