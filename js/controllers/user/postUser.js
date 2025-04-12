import UserService from "../../services/UserService.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("user-save-form");
  const errorImagen = document.getElementById("errorImagen");
  const alertContainer = document.getElementById("alert-container");
  const imageInput = document.getElementById("image");

  // Función para mostrar alertas de Bootstrap
  const showAlert = (message, type) => {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertContainer.appendChild(alert);

    // Eliminar la alerta después de 4 segundos
    setTimeout(() => {
      alert.remove();
    }, 4000);
  };

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let loading = document.getElementById("create-loading");
    loading.style.display = "flex";
    form.style.display = "none";

    try {
      await createUser();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      showAlert("❌ Hubo un error al crear el usuario. Intenta de nuevo.", "danger");
    } finally {
      loading.style.display = "none";
      form.style.display = "flex";
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
      showAlert("❌ Las contraseñas no coinciden.", "danger");
      return;
    }

    // Verificar si se subió una imagen
    const imageFile = imageInput.files[0];
    if (imageFile) {
      formData.append("image", imageFile);
      errorImagen.classList.add("d-none"); // Oculta el mensaje de error si la imagen es válida
    } else {
      errorImagen.classList.remove("d-none"); // Muestra el mensaje de error
      showAlert("⚠️ Debes subir una imagen.", "warning");
      return;
    }

    try {
      const response = await UserService.createUser(formData);

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error en la creación del usuario:", response.status, response.statusText, errorDetails);
        showAlert(`❌ Error al crear el usuario: ${errorDetails}`, "danger");
        return;
      }

      console.log("✅ Usuario creado con éxito");
      showAlert("✅ Usuario creado con éxito. Redirigiendo...", "success");

      // Limpiar el formulario después del registro exitoso
      form.reset();

      // Redirigir a login.html después de 2 segundos
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      showAlert("❌ Hubo un error en la solicitud. Inténtalo de nuevo.", "danger");
    }
  };

  // Ocultar el mensaje de error al seleccionar una imagen
  imageInput.addEventListener("change", function () {
    if (imageInput.files.length > 0) {
      errorImagen.classList.add("d-none");
    }
  });
});
