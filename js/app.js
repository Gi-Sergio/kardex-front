const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

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

function openRegister(){
    document.getElementById("sign-in-form").style.display = "none";
    container.classList.add("sign-up-mode");
    document.getElementById("user-save-form").style.display = "flex";
}

function openLogin(){
    document.getElementById("user-save-form").style.display = "none";
    container.classList.remove("sign-up-mode");
    document.getElementById("sign-in-form").style.display = "flex";
}

