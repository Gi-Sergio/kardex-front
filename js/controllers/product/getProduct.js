import ProductService from "../../services/ProductService.js";
import { handleApiResponse } from "../../utils/handleApiResponse.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("loading").style.display = "block";
  document.getElementById("product-card").style.display = "none";
  document.getElementById("no-products").style.display = "none";

  await getProduct();
});

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

  document.getElementById("name").innerHTML = product.name;
  document.getElementById("quantity").innerText = product.quantity;
  document.getElementById("price").innerText = product.price;
  document.getElementById("description").innerText = product.description;

  const status = document.getElementById("status");
  status.textContent = product.status ? "Disponible" : "No disponible";
  status.classList.add(product.status ? "disponible" : "no-disponible");

  const img = document.getElementById("image");
  img.src = product.imageUrl || "/img/Logo_Empresa.png";
  img.alt = product.name || "Imagen por defecto";

  img.onerror = function () {
    img.src = "/img/Logo_Empresa.png";
  };

  document.getElementById("loading").style.display = "none";
  document.getElementById("product-card").style.display = "block";
};