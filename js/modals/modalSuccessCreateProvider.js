// Mostrar el modal de éxito
function showSuccessModal() {
    document.getElementById("successModal").style.display = "flex";
  }
  
  // Cerrar el modal de éxito
  function closeSuccessModal() {
    window.location.href = "proveedores.html";
    document.getElementById("successModal").style.display = "none";
  }
  
  // Redirigir a la vista de productos
  function redirectToProvider() {
    window.location.href = "proveedores.html";
  }
  window.showSuccessModal = showSuccessModal;
  window.closeSuccessModal = closeSuccessModal;
  window.redirectToProvider = redirectToProvider;
