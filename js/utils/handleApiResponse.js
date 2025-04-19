export function handleApiResponse(data, { noDataId, loadingId, containerId }) {
  if (data.Message === "No data found") {
    if (noDataId) {
      const element = document.getElementById(noDataId);
      if (element) element.style.display = "flex";
    }
    if (loadingId) {
      const element = document.getElementById(loadingId);
      if (element) element.style.display = "none";
    }
    if (containerId) {
      const element = document.getElementById(containerId);
      if (element) element.innerHTML = "";
    }
    return false;
  }

  if (data.Message === "Your session has expired. Please log in again.") {
    console.log(data.Message);
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return false;
  }

  return true;
}
