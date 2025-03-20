const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
if (sign_up_btn2) {
    sign_up_btn2.addEventListener("click", () => {
        container.classList.add("sign-up-mode2");
    });
}

if (sign_in_btn2) {
    sign_in_btn2.addEventListener("click", () => {
        container.classList.remove("sign-up-mode2");
    });
}
function redirectToIndex(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
        // Aquí puedes agregar tu lógica para procesar el formulario, si es necesario.
        
        // Redirige a index.html
        window.location.href = 'index.html';
}

const toggleButton = document.createElement("button");
toggleButton.innerHTML = "&#9776;";  // Icono de hamburguesa
toggleButton.classList.add("logo-menu-btn");

toggleButton.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("active");
});

    // Función para abrir el modal
    function openModal() {
        document.getElementById('modalEliminar').style.display = 'flex';
    }

    // Función para cerrar el modal
    function closeModal() {
        document.getElementById('modalEliminar').style.display = 'none';
    }

