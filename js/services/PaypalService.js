const PayPalService = {
    async createOrder(cartId) {
      const response = await fetch(
        `http://localhost:8082/api/paypal/create-order?cartId=${cartId}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      return data.orderId;
    },
  };
  
  export default PayPalService;
  