import CartService from "../../services/CartService.js";

export const addItemtoCart = async (productId, quantity) =>{
    const response = await CartService.addItem(productId, quantity);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(
        "Error en la agragacion al carrito:",
        response.status,
        response.statusText,
        errorDetails
      );
    }
    console.log("Añadido al carrito con éxito");
}