import ProductService from "../../services/ProductService.js";

let page = 0;
const pagesize = 9999;
document.getElementById("searchProduct").addEventListener("input", async (event) => {
  let filter = event.target.value.toLowerCase(); 
  let resultsContainer = document.getElementById("products");
  let paginationContainer = document.getElementById("pagination");

  // 🔸 Ocultamos la paginación mientras se escribe
  paginationContainer.style.display = "none";

  resultsContainer.innerHTML = "";

  const data = await ProductService.getAll(page, pagesize);
  const products = data.content || [];

  let filteredProducts = products.filter(
    (product) => product.name?.toLowerCase().includes(filter)
  );

  let existingNoDataMessage = document.getElementById("no-data-message");

  if (filteredProducts.length === 0) {
    if (!existingNoDataMessage) {
      const noDataMessage = document.createElement("p");
      noDataMessage.textContent = "No hay productos disponibles con este nombre";
      noDataMessage.classList.add("no-data-message");
      noDataMessage.id = "no-data-message";
      resultsContainer.appendChild(noDataMessage);
    }
    return;
  } else {
    if (existingNoDataMessage) {
      existingNoDataMessage.remove();
    }
  }

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const name = document.createElement("h3");
    name.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1); 

    const img = document.createElement("img");
    img.src = product.imageUrl ?? "/img/Logo_Empresa.png"; 
    img.alt = product.name || "Imagen por defecto";

    img.onerror = () => {
      img.src = "/img/Logo_Empresa.png";
    };

    const status = document.createElement("p");
    status.textContent = product.status ? "Disponible" : "No disponible";
    status.classList.add(product.status ? "disponible" : "no-disponible");

    const btnVerMaS = document.createElement("button");
    btnVerMaS.textContent = "Ver más";
    btnVerMaS.addEventListener("click", () => {
      window.location.href = `producto.html?id=${product.id}`;
    });

    productCard.append(name, img, status, btnVerMaS);
    resultsContainer.appendChild(productCard);
  });

  // 🔸 Mostrar la paginación solo si NO hay filtro
  if (filter.trim() === "") {
    paginationContainer.style.display = "flex";
  }
});
