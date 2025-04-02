// Obtener los elementos del DOM
const openModalButton = document.getElementById("openModalButton");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModalButton");
const cancelModalButton = document.getElementById("cancelModalButton");

// Abrir el modal
openModalButton.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Cerrar el modal al hacer clic en el botón de cerrar
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar el modal al hacer clic en el botón de cancelar
cancelModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});