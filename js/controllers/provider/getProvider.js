import ProviderService from "../../services/ProviderService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";

const params = new URLSearchParams(window.location.search);
const providerId = params.get("id");

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("loading-providers").style.display = "block";
  document.getElementById("provider").style.display = "none";
  document.getElementById("no-providers").style.display = "none";

  await getProvider();
});

let getProvider = async () => {
  const provider = await ProviderService.getById(providerId);

  if (
    !handleApiResponse(provider, {
      noDataId: "no-providers",
      loadingId: "loading-providers",
      containerId: "provider",
    })
  ) {
    return;
  }

  document.getElementById("companyName").innerHTML = provider.companyName;
  document.getElementById("name").innerHTML = provider.name;
  document.getElementById("email").innerText = provider.email;
  document.getElementById("description").innerText = provider.description;
  document.getElementById("whatsapp").href = `https://api.whatsapp.com/send?phone=${provider.phone}&text=Hola%20me%20quiero%20comunicar%20contigo.%20Muchas%20Gracias`
  document.getElementById("facebook").href = `https://mail.google.com/mail/?view=cm&fs=1&to=${provider.email}`

  const status = document.getElementById("status");
  status.textContent = provider.status ? "Disponible" : "No disponible";
  
  const img = document.getElementById("image");
  img.src = provider.imageUrl || "/img/Usuario.png";
  img.alt = provider.name || "Imagen por defecto";

  img.onerror = function () {
    img.src = "/img/Logo_Empresa.png";
  };

  document.getElementById("loading-providers").style.display = "none";
  document.getElementById("provider").style.display = "flex";
};