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
    email: document.getElementById("user-sign-in").value.trim(),
    password: document.getElementById("password-sign-in").value.trim(),
  };

  try {
    console.log("Intentando hacer la petición...");
    let response = await fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // Primero intentamos obtener el JSON
    const data = await response.json();

    // Si la respuesta no es OK, lanzamos un error con el mensaje del servidor
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${data?.message || "Error desconocido"}`);
    }

    // Verificamos si el token está en la respuesta
    if (!data.token) {
      throw new Error("No se recibió un token en la respuesta del servidor");
    }

    // Guardamos el token en localStorage
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";

  } catch (error) {
    console.error("Error en la autenticación:", error.message);
    alert("Ocurrió un error al iniciar sesión. Inténtalo nuevamente.");
  }
};
