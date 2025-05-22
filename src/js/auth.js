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

  document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("matchhub_user"));
    if (!user || user.role !== "admin") return;
  
    // Fill player dropdown
    const playerSelect = document.getElementById("playerSelect");
    if (playerSelect) {
      users.forEach((u) => {
        const option = document.createElement("option");
        option.value = u.id;
        option.textContent = u.name;
        playerSelect.appendChild(option);
      });
    }
  
    // Fill tournament dropdown
    const tournamentSelect = document.getElementById("tournamentSelectForInvite");
    if (tournamentSelect) {
      getTournaments().forEach((t) => {
        const option = document.createElement("option");
        option.value = t.id;
        option.textContent = t.title;
        tournamentSelect.appendChild(option);
      });
    }
  
    // Handle invite form submit
    const inviteForm = document.getElementById("inviteForm");
    if (inviteForm) {
      inviteForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const userId = playerSelect.value;
        const tournamentId = tournamentSelect.value;
  
        if (!userId || !tournamentId) {
          alert("Please select both player and tournament.");
          return;
        }
  
        inviteToTournament(userId, tournamentId); // Uses your existing function
        alert("Invitation sent!");
        inviteForm.reset();
      });
    }
  });