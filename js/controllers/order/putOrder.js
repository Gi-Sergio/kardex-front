import OrderService from "../../services/OrderService.js";

// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const orderId = params.get("idOrder");
const tokenOrder = params.get("tokenOrder");
let currentStatus = "Pedido realizado";
let isCancelled = false; // Indicador de si el pedido ha sido cancelado

// Cargar estado inicial del pedido
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const order = await OrderService.getById(orderId, tokenOrder);
        const status = {
            1: "Pedido realizado",
            2: "Enviado",
            3: "En tránsito",
            4: "Entregado",
            5: "Cancelado"
        }[order.status.id] || "Desconocido";

        currentStatus = status;
        isCancelled = (currentStatus === "Cancelado");
        updateUI();
    } catch (error) {
        console.error("Error obteniendo estado del pedido:", error);
    }
});

// Función para cambiar el estado del pedido con un modal de confirmación
window.changeStatus = async function (element) {
    // Verificar si el estado está cancelado, si lo está no se puede cambiar
    if (isCancelled) {
        Swal.fire("Error", "El pedido está cancelado y no se puede actualizar.", "error");
        return;
    }

    const statusId = parseInt(element.getAttribute("data-status"));
    const statusNames = {
        1: "Pedido realizado",
        2: "Enviado",
        3: "En tránsito",
        4: "Entregado"
    };

    const newStatus = statusNames[statusId] || "Desconocido";

    // Si el estado actual es el mismo que el nuevo estado, no hacer nada
    if (currentStatus === newStatus) {
        return;
    }

    // Si el nuevo estado es posterior al estado actual, proceder con el cambio
    if (statusId > Object.keys(statusNames).find(key => statusNames[key] === currentStatus)) {
        Swal.fire({
            title: "Confirmar cambio",
            text: `¿Estás seguro de actualizar el estado a "${newStatus}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, actualizar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#0CACAB",
            cancelButtonColor: "#d33"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await OrderService.update(orderId, statusId);
                    currentStatus = newStatus;
                    isCancelled = (currentStatus === "Cancelado");
                    updateUI();
                } catch (error) {
                    console.error("Error actualizando estado:", error);
                    Swal.fire("Error", "No se pudo actualizar el estado.", "error");
                }
                window.location.reload();
            }
        });
    } else {
        Swal.fire("Error", "No puedes retroceder al estado anterior.", "error");
    }
};

// Función para actualizar la UI
function updateUI() {
    const statusOrder = ["Pedido realizado", "Enviado", "En tránsito", "Entregado", "Cancelado"];
    const newIndex = statusOrder.indexOf(currentStatus);

    document.getElementById("current-status").textContent = currentStatus;

    const steps = document.querySelectorAll(".progress-step");
    steps.forEach((step, index) => {
        if (currentStatus === "Cancelado") {
            const cancelButton = document.getElementById("cancel-button");
            if (!cancelButton) return;
            cancelButton.disabled = true;
            cancelButton.style.cursor = "not-allowed";
            step.classList.remove("active");
            step.classList.add("desactive");
            step.style.cursor = "not-allowed";
            isCancelled = true;
        } else if (index <= newIndex) {
            step.classList.add("active");
            step.style.cursor = "default";
        } else if (index === newIndex + 1) {
            step.style.cursor = "pointer";
        } else {
            step.style.cursor = "not-allowed";
        }
    });
}

// Función para cancelar el pedido con confirmación elegante
window.cancelOrder = async function () {
    Swal.fire({
        title: "Cancelar pedido",
        text: "¿Estás seguro de cancelar el pedido? Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "No, mantener",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0CACAB"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                console.log("Cancelando pedido...");
                await OrderService.update(orderId, 5);
                currentStatus = "Cancelado";
                isCancelled = true;
                updateUI();
            } catch (error) {
                console.error("Error cancelando pedido:", error);
            }
        }
    });
};
