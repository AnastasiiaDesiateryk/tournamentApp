// File: forms.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tournamentForm");
    const successMessage = document.getElementById("successMessage");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Get input values
      const name = document.getElementById("tournamentName").value.trim();
      const type = document.getElementById("tournamentType").value;
      const location = document.getElementById("location").value.trim();
      const date = document.getElementById("date").value;
      const description = document.getElementById("description").value.trim();
  
      // Create tournament object
      const tournament = {
        id: generateId(),
        name,
        type,
        location,
        date,
        description,
        players: [], // Empty player list (can be filled later)
        status: "Upcoming"
      };
  
      // Save to localStorage
      const existingTournaments = JSON.parse(localStorage.getItem("TOURNAMENTS")) || [];
      existingTournaments.push(tournament);
      localStorage.setItem("TOURNAMENTS", JSON.stringify(existingTournaments));
  
      // Show success message and clear form
      form.reset();
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 2500);
    });
  
    // Helper: Random ID generator
    function generateId() {
      return Math.floor(Math.random() * 10000000).toString();
    }
  });