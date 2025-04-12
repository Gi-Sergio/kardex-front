
import NotificationService from "../../services/NotificationService.js";

document.addEventListener("DOMContentLoaded", async () => {
  await listNotificationsStatus();
});

const listNotificationsStatus = async () => {
  const notifications = await NotificationService.getAllStatusNotifications();
  const campanita = document.getElementById("campanita");

  if (notifications.Message){
    campanita.checked = false;
    return;
  }
  for (const notification of notifications) {
    if (notification.status.id == 1) {
      campanita.checked = true;
      campanita.disabled = true;
      break;
    }
  }
};
