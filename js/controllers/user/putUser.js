import UserService from "../../services/UserService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";

// Obtener ID del usuario desde la URL
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

document.addEventListener("DOMContentLoaded", async function () {
  const editBtn = document.getElementById("edit-btn");
  const saveBtn = document.getElementById("save-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const inputs = document.querySelectorAll("#update-user-form input");

  let originalValues = {}; // Guardará los valores originales

  // Función para habilitar inputs y mostrar botones
  editBtn.addEventListener("click", function () {
    inputs.forEach(input => {
      originalValues[input.id] = input.value; // Guardamos el valor original
      input.disabled = false;
    });

    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
  });

  // Función para cancelar la edición y restaurar valores originales
  cancelBtn.addEventListener("click", function () {
    inputs.forEach(input => {
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
      const response = await UserService.updateUser(userId, user);

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
        // Si la actualización es exitosa, deshabilitar inputs y mostrar alerta
        inputs.forEach(input => input.disabled = true);
        
        // Restaurar la visibilidad de los botones
        editBtn.style.display = "inline-block";
        saveBtn.style.display = "none";
        cancelBtn.style.display = "none";

        alert("Usuario actualizado exitosamente");
      } else {
        const errorDetails = await response.text();
        console.error(
          "Error en la actualización del usuario:",
          response.status,
          response.statusText,
          errorDetails
        );
        alert(`Error al actualizar el usuario: ${errorDetails}`);
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Ocurrió un error al actualizar el usuario.");
    }
  });
});
