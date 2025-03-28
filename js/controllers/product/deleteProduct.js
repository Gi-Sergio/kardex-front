import ProductService from "../../services/ProductService.js";

// Ejecutar el código solo cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const btnDelete = document.getElementById("btn-delete-product");
    const deleteModal = document.getElementById("delete-modal");
    const successModal = document.getElementById("successModal-3");
    const btnCloseSuccess = document.getElementById("btn-close-success");
    const btnViewProducts = document.getElementById("btn-view-products-3");

    // Evento para eliminar producto
    btnDelete.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevenir redirección o refresco accidental
        try {
            await deleteProduct();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("Hubo un error al eliminar el producto. Intenta de nuevo.");
        } finally {
            loading.style.display = "none";
            deleteModal.style.display = "flex";
        }
    });

    // Función de eliminación
    async function deleteProduct() {
        const response = await ProductService.delete(productId);

        if (response.status !== 204) {
            const errorDetails = await response.text();
            console.error("Error en la eliminación del producto:", response.status, response.statusText, errorDetails);
            alert(`Error al eliminar el producto: ${errorDetails}`);
            return false;
        }

        console.log("Producto eliminado con éxito");
        successModal.style.display = "block"; // Mostrar modal de éxito
        return true;
    }

    // Evento para redirigir a la página de productos
    btnViewProducts.addEventListener("click", function () {
        window.location.href = "productos.html";
    });
});
