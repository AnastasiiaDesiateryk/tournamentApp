// src/js/auth.js

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("matchhub_user"));
  
    // Redirect to login if no user is logged in
    if (!user) {
      alert("You must be logged in.");
      window.location.href = "../../src/views/login.html";
      return;
    }
  
    // Optional: Show username somewhere
    const userSpan = document.getElementById("usernameDisplay");
    if (userSpan) {
      userSpan.textContent = user.username;
    }
  
    // Role-based UI control
    const isAdmin = user.role === "admin";
    document.querySelectorAll(".admin-only").forEach(el => {
      el.style.display = isAdmin ? "block" : "none";
    });
    document.querySelectorAll(".player-only").forEach(el => {
      el.style.display = isAdmin ? "none" : "block";
    });
  
    // Optional logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("matchhub_user");
        window.location.href = "../../src/views/login.html";
      });
    }
  });