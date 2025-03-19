// Obtiene el formulario
const form = document.getElementById("sign-in-form");

// Escucha el evento submit del formulario
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Previene el envío tradicional del formulario
  await login(); // Llama a la función asincrónica para autenticar
});

// Función asincrónica para enviar el formulario
let login = async () => {
  let user = {
    email: document.getElementById("user-sign-in").value,
    password: document.getElementById("password-sign-in").value,
  };

  // Envia la solicitud al backend usando fetch con el método POST
  let response = await fetch("http://localhost:8081/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (data.Message && data.Message === "Incorrect username or password") {
    alert(data.Message);
    return;
  } else {
    // Obtenemos el token del objeto de respuesta y lo guardamos en localStorage
    const token = data.token;
    localStorage.setItem("token", token); // Guardamos el token en localStorage
    window.location.href = "index.html";
  }

  if(!response.ok){
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
