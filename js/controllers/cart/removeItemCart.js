import CartService from "../../services/CartService.js";

export const removeItemCart = async (productId) =>{
    const response = await CartService.removeItem(productId);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(
        "Error en la eliminacion del producto en el carrito:",
        response.status,
        response.statusText,
        errorDetails
      );
    }
    console.log("Eliminado del carrito con éxito");
    window.location.reload()
}