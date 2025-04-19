// Función para abrir el modal
function openModal(modalId, productId) {
  console.log("Open modal", modalId, productId);
  document.getElementById(modalId).classList.add("show");
  document.getElementById("productId").value = productId;
  document.getElementById("quantity").value = "";
}

// Función para cerrar el modal
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("show");
}
function closeAllModals() {
  document.getElementById("confirmacionModal").classList.remove("show");
  document.getElementById("pedidoModal").classList.remove("show");
}

function redirectOrder() {
  window.location.href = "pedidos.html";
}

