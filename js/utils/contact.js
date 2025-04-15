 
  emailjs.init("O6C2P-hI9JYPml8Vz");

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const mensajeExito = document.getElementById("mensajeExito");
    const btn = document.getElementById("button");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      mensajeExito.textContent = "";

      if (nombre === "" || correo === "" || mensaje === "") {
        mensajeExito.style.color = "red";
        mensajeExito.textContent = "Todos los campos son obligatorios.";
        return;
      }
      console.log("nombre: ", nombre);
      console.log("correo: ", correo);
      console.log("mensaje: ", mensaje);

      btn.value = "Enviando...";

      const serviceID = "service_rzv5hvj";      // o tu ID personalizado
      const templateID = "template_npg8l1j";     // el ID de tu plantilla

      emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
          btn.value = "Enviar";
          mensajeExito.style.color = "green";
          mensajeExito.textContent = "¡Mensaje enviado correctamente!";
          form.reset();
        })
        .catch((err) => {
          btn.value = "Enviar";
          mensajeExito.style.color = "red";
          mensajeExito.textContent = "Error al enviar: " + (err.text || JSON.stringify(err));
        });
    });
  });

