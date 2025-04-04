import UserService from "../../services/UserService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("loading-user").style.display = "block";
  document.getElementById("user-container").style.display = "none";
  document.getElementById("no-user").style.display = "none";

  await getUser();
});

async function getUser() {
  const user = await UserService.getUser();

  if (
    !handleApiResponse(user, {
      noDataId: "no-user",
      loadingId: "loading-user",
      containerId: "user-container",
    })
  ) {
    return;
  }

  const username = document.getElementById("username");
  if (username) {
    username.value = user.username;
  }
  
  setElementValue("companyName", user.companyName);
  setElementValue("email", user.email);

  const img = document.getElementById("user-image-preview");
  img.src = user.imageUrl || "/img/Usuario.png";
  img.onerror = function () {
    img.src = "/img/Usuario.png";
  };

  document.getElementById("loading-user").style.display = "none";
  document.getElementById("user-container").style.display = "block";
}

function setElementValue(elementId, newValue) {
  const element = document.getElementById(elementId);

  if (!element) {
      console.warn(`Elemento con ID '${elementId}' no encontrado.`);
      return;
  }

  // Verificar si el elemento es un input, textarea o select
  if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") {
      element.value = newValue;
  } else {
      element.textContent = newValue;
  }
}
