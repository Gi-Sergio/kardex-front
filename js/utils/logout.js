const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
};

document.getElementById("logoutButton").addEventListener("click", logout);
