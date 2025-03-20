// Obtiene el formulario
const form = document.getElementById("sign-in-form");

// Escucha el evento submit del formulario
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Previene el envío tradicional del formulario
  await login(); // Llama a la función asincrónica para autenticar
});

// Función asincrónica para enviar el formulario
let login = async () => {
  const email = document.getElementById("user-sign-in").value.trim();
  const password = document.getElementById("password-sign-in").value.trim();

  // Validación previa
  if (!email || !password) {
    alert("Por favor, ingresa tu correo y contraseña.");
    return;
  }

  let user = { email, password };

  try {
    // Envia la solicitud al backend usando fetch con el método POST
    let response = await fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // Verifica si la respuesta es exitosa antes de intentar parsear JSON
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (data.Message && data.Message === "Incorrect username or password") {
      alert("Usuario o contraseña incorrectos.");
      return;
    }

    // Obtenemos el token y lo guardamos en localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      alert("Error: No se recibió un token.");
    }
  } catch (error) {
    console.error("Error en el login:", error);
    alert("Error al conectar con el servidor. Intenta de nuevo más tarde.");
  }
};
