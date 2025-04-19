import { capitalizeFirstLetter } from "./capitalizeFirstLetter.js";

export const generateInvoicePDF = (order) => {
  const [date, time] = order.createdAt.split("T");
  const formattedTime = time.split(".")[0];

  const invoiceHTML = `
  <div style="font-family: Arial; padding: 20px; max-width: 700px; position: relative;">
    
    <!-- Marca de agua / Logo de fondo -->
  <img src="/img/Icono-K.png" 
        style="position: absolute; top: 50%; left: 50%; 
               transform: translate(-50%, -50%); 
               opacity: 0.07; 
               max-width: 80%; 
               z-index: 0;" />

    <div style="position: relative; z-index: 1;">
      <h1 style="text-align: center; color: #0CACAB;">Factura</h1>
      <hr>
      <p><strong>Número de Pedido:</strong> ${order.numberOrder}</p>
      <p><strong>Fecha:</strong> ${date}</p>
      <p><strong>Hora:</strong> ${formattedTime}</p>
      <br>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #0CACAB; color: white;">
            <th style="padding: 8px; border: 1px solid #ccc;">Producto</th>
            <th style="padding: 8px; border: 1px solid #ccc;">Cantidad</th>
            <th style="padding: 8px; border: 1px solid #ccc;">Precio</th>
            <th style="padding: 8px; border: 1px solid #ccc;">Proveedor</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map((item) => {
              return `
              <tr>
                <td style="padding: 8px; border: 1px solid #ccc;">${capitalizeFirstLetter(
                  item.product.name
                )}</td>
                <td style="padding: 8px; border: 1px solid #ccc;">${
                  item.quantity
                }</td>
                <td style="padding: 8px; border: 1px solid #ccc;">$${item.product.price.toLocaleString()}</td>
                <td style="padding: 8px; border: 1px solid #ccc;">${capitalizeFirstLetter(
                  item.product.provider.companyName
                )}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
      <br>
      <div style="text-align: right;">
        <p style="font-size: 1.2em;"><strong>Total:</strong> $${order.totalAmount.toLocaleString()}</p>
      </div>
      <p style="text-align: center; margin-top: 40px;">¡Gracias por su compra! 🌟</p>
    </div>
  </div>
`;

  const invoiceElement = document.createElement("div");
  invoiceElement.innerHTML = invoiceHTML;

  html2pdf()
    .set({
      margin: 10,
      filename: `Factura_Pedido_${order.numberOrder}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(invoiceElement)
    .save();
};
