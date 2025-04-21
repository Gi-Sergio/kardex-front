import PayPalService from "../../services/PaypalService.js";

document.addEventListener("DOMContentLoaded", () => {
  paypal
    .Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "pill",
        label: "buynow",
      },
      createOrder: function (data, actions) {
        let cartId = localStorage.getItem("cartId");

        return PayPalService.createOrder(cartId);
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          console.log("Detalles del pago:", details);
          Swal.fire({
            title: "Éxito",
            text: "Tu pedido se genero correctamente, dirigite a la parte de pedidos para hacerle seguimiento a este, se paciente a veces puede tardar en generarse",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#0CACAB"
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        });
      },
      onError: function (err) {
        console.error("Error en el pago:", err);
        Swal.fire({
          title: "Error",
          text: "Lo sentimos, hubo un error mientras se generaba el pago",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#0CACAB"
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      },
    })
    .render("#paypal-button-container");
});
