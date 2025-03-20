// Obtiene el formulario de registro
const form = document.getElementById("sign-up-form");

// Escucha el evento submit del formulario
form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Previene el envío tradicional del formulario
    await register(); // Llama a la función asincrónica para registrar
});

// Función asincrónica para registrar un usuario
let register = async () => {
    const messageContainer = document.getElementById("register-message");
    messageContainer.innerHTML = ""; // Limpia mensajes anteriores

    // Obtener valores del formulario
    let user = {
        companyName: document.getElementById("companyName").value.trim(),
        email: document.getElementById("email").value.trim(),
        username: document.getElementById("username").value.trim(),
        password: document.getElementById("password").value.trim(),
        confirmPassword: document.getElementById("confirm-password").value.trim(),
    };

    // Validaciones básicas
    if (!user.companyName || !user.email || !user.username || !user.password || !user.confirmPassword) {
        messageContainer.innerHTML = '<p class="error-message">Todos los campos son obligatorios.</p>';
        return;
    }

    if (user.password !== user.confirmPassword) {
        messageContainer.innerHTML = '<p class="error-message">Las contraseñas no coinciden.</p>';
        return;
    }

    if (user.password.length < 6) {
        messageContainer.innerHTML = '<p class="error-message">La contraseña debe tener al menos 6 caracteres.</p>';
        return;
    }

    try {
        let response = await fetch("http://localhost:8081//users/create", {  // <-- Cambiar el endpoint
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (!response.ok) {
            messageContainer.innerHTML = `<p class="error-message">${data.message || "Error al registrarse."}</p>`;
            return;
        }

        // Si el registro es exitoso
        messageContainer.innerHTML = '<p class="success-message">Registro exitoso. Redirigiendo...</p>';
        setTimeout(() => {
            window.location.href = "index.html"; // Redirecciona a la página principal
        }, 2000);

    } catch (error) {
        messageContainer.innerHTML = '<p class="error-message">Error de conexión con el servidor.</p>';
        console.error("Error en el registro:", error);
    }
};
