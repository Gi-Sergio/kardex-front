// Variable para almacenar la última notificación eliminada
let lastDeletedNotification = null;
let undoTimer = null;

// Función para marcar una notificación como leída
function markAsRead(button) {
    const notification = button.closest('.notification');
    notification.classList.add('read');
}

// Función para eliminar una notificación
function deleteNotification(button) {
    const notification = button.closest('.notification');
    
    // Guardar la notificación actual antes de eliminarla
    clearTimeout(undoTimer); // Limpiar el temporizador anterior si existe
    
    // Guardar copia de la notificación y su posición
    const notificationClone = notification.cloneNode(true);
    const notificationIndex = Array.from(notification.parentNode.children).indexOf(notification);
    
    lastDeletedNotification = {
        element: notificationClone,
        index: notificationIndex
    };
    
    // Habilitar el botón de deshacer
    document.getElementById('undoButton').disabled = false;
    
    // Configurar un temporizador para deshabilitar el botón después de 10 segundos
    undoTimer = setTimeout(() => {
        document.getElementById('undoButton').disabled = true;
        lastDeletedNotification = null;
    }, 10000); // 10 segundos
    
    // Animación de desvanecimiento
    notification.style.opacity = '0';
    setTimeout(() => {
        notification.remove();
        checkEmptyState();
    }, 300);
}

// Función para deshacer la eliminación
function undoDelete() {
    if (!lastDeletedNotification) return;
    
    const list = document.getElementById('notificationList');
    
    // Eliminar el estado vacío si existe
    const emptyState = list.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    // Restaurar la notificación
    const restoredNotification = lastDeletedNotification.element;
    
    // Añadir de nuevo la notificación en su posición original
    if (lastDeletedNotification.index === 0) {
        // Si era la primera, insertarla al principio
        list.insertBefore(restoredNotification, list.firstChild);
    } else if (lastDeletedNotification.index >= list.children.length) {
        // Si era la última o ya no hay suficientes elementos
        list.appendChild(restoredNotification);
    } else {
        // Insertar en la posición original
        list.insertBefore(restoredNotification, list.children[lastDeletedNotification.index]);
    }
    
    // Reconectar los eventos
    const markReadButton = restoredNotification.querySelector('.mark-read');
    markReadButton.onclick = function() { markAsRead(this); };
    
    const deleteButton = restoredNotification.querySelector('.delete');
    deleteButton.onclick = function() { deleteNotification(this); };
    
    // Aplicar efecto de aparición
    restoredNotification.style.opacity = '0';
    setTimeout(() => {
        restoredNotification.style.opacity = '1';
    }, 10);
    
    // Reiniciar variables
    lastDeletedNotification = null;
    clearTimeout(undoTimer);
    document.getElementById('undoButton').disabled = true;
}

// Función para verificar si no hay notificaciones
function checkEmptyState() {
    const list = document.getElementById('notificationList');
    if (list.children.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <p>No tienes notificaciones</p>
            <button class="add-notification" onclick="addDemoNotification()">Agregar notificación de prueba</button>
        `;
        list.appendChild(emptyState);
    }
}

// Función para agregar una notificación de prueba
function addDemoNotification() {
    
    // Añadir al principio de la lista
    list.insertBefore(newNotification, list.firstChild);
    
    // Efecto de aparición
    newNotification.style.opacity = '0';
    setTimeout(() => {
        newNotification.style.opacity = '1';
    }, 10);
}