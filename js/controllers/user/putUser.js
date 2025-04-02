import UserService from "../../services/UserService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";

document.addEventListener("DOMContentLoaded", async function () {
  const editBtn = document.getElementById("edit-btn");
  const saveBtn = document.getElementById("save-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const inputs = document.querySelectorAll("#update-user-form input");
  const alertContainer = document.getElementById("alert-container");

  let originalValues = {}; // Guardará los valores originales

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

  // Función para habilitar inputs y mostrar botones
  editBtn.addEventListener("click", function () {
    inputs.forEach((input) => {
      originalValues[input.id] = input.value; // Guardamos el valor original
      input.disabled = false;
    });

    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
  });

  // Función para cancelar la edición y restaurar valores originales
  cancelBtn.addEventListener("click", function () {
    inputs.forEach((input) => {
      input.value = originalValues[input.id]; // Restauramos valores
      input.disabled = true;
    });

    editBtn.style.display = "inline-block";
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
  });

  // Manejo del envío del formulario
  document.getElementById("update-user-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el envío tradicional

    const user = {
      username: document.getElementById("username").value,
      companyName: document.getElementById("companyName").value,
      email: document.getElementById("email").value
    };

    try {
      const response = await UserService.updateUser(user);

      if (
        !handleApiResponse(user, {
          noDataId: "no-user",
          loadingId: "loading-user",
          containerId: "user-container",
        })
      ) {
        return;
      }

      if (response.status === 204) {
        // Si la actualización es exitosa
        inputs.forEach((input) => (input.disabled = true));

        // Restaurar la visibilidad de los botones
        editBtn.style.display = "inline-block";
        saveBtn.style.display = "none";
        cancelBtn.style.display = "none";

        showAlert("✅ Usuario actualizado exitosamente", "success");

        // Cerrar sesión y redirigir al login
        setTimeout(() => {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "login.html";
        }, 2000);
      } else {
        const errorDetails = await response.text();
        console.error(
          "Error en la actualización del usuario:",
          response.status,
          response.statusText,
          errorDetails
        );
        showAlert(`❌ Error al actualizar el usuario: ${errorDetails}`, "danger");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      showAlert("❌ Ocurrió un error al actualizar el usuario.", "danger");
    }
  });
});
