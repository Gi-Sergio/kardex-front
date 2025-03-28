// Función para abrir el modal
function openModal(modalId, productId) {
  document.getElementById(modalId).classList.add("show");
  document.getElementById("productId").value = productId;
}

// Función para cerrar el modal
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("show");
}

function redirectOrder() {
  window.location.href = "pedidos.html";
}
