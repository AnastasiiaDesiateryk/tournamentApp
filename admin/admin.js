// admin.js

// Sidebar navigation
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".admin-section");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const target = item.getAttribute("data-section");
    sections.forEach(section => {
      section.classList.add("d-none");
    });

    document.getElementById(target).classList.remove("d-none");
  });
});

// Logo redirect
const logoRedirect = document.getElementById("logoRedirect");
if (logoRedirect) {
  logoRedirect.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    document.querySelector('[data-section="dashboard-section"]').classList.add("active");
    sections.forEach(section => {
      section.classList.add("d-none");
    });
    document.getElementById("dashboard-section").classList.remove("d-none");
  });
}

// Logout functionality
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("LOGGED_IN_USER");
    window.location.href = "../index.html";
  });
}

// Display tournaments from localStorage
function renderTournaments() {
  const tournamentList = document.getElementById("tournamentList");
  const tournaments = JSON.parse(localStorage.getItem("TOURNAMENTS")) || [];

  if (!tournamentList) return;
  tournamentList.innerHTML = "";

  tournaments.forEach((tournament, index) => {
    const card = document.createElement("div");
    card.className = "tournament-card";

    card.innerHTML = `
      <div class="tournament-info" data-id="${tournament.id}">
        <h3>${tournament.name}</h3>
        <p><strong>Type:</strong> ${tournament.type}</p>
        <p><strong>Location:</strong> ${tournament.location}</p>
        <p><strong>Date:</strong> ${tournament.date}</p>
      </div>
      <div class="tournament-actions">
        <button class="btn-secondary" onclick="editTournament('${tournament.id}')">Edit</button>
        <button class="btn-secondary invite-btn" data-id="${tournament.id}">Invite</button>
        <button class="btn-danger" onclick="deleteTournament('${tournament.id}')">Delete</button>
      </div>
    `;

    card.querySelector(".tournament-info").addEventListener("click", () => {
      localStorage.setItem("SELECTED_TOURNAMENT_ID", tournament.id);
      window.location.href = "tournament.html";
    });

    tournamentList.appendChild(card);
  });
}

function deleteTournament(id) {
  if (confirm("Are you sure you want to delete this tournament?")) {
    let tournaments = JSON.parse(localStorage.getItem("TOURNAMENTS")) || [];
    tournaments = tournaments.filter(t => t.id !== id);
    localStorage.setItem("TOURNAMENTS", JSON.stringify(tournaments));
    renderTournaments();
  }
}

function editTournament(id) {
  localStorage.setItem("EDIT_TOURNAMENT_ID", id);
  window.location.href = "forms.html";
}

// Run on page load
renderTournaments();

// Load players from global or local storage
function getAllPlayers() {
  const tempPlayers = localStorage.getItem("USERS");
  return tempPlayers ? JSON.parse(tempPlayers) : [];
}

// Open invite modal
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("invite-btn")) {
    const tournamentId = e.target.getAttribute("data-id");
    const modal = document.getElementById("inviteModal");
    const playerListUl = document.getElementById("playerListToInvite");
    playerListUl.innerHTML = "";

    const players = getAllPlayers();
    players.forEach(player => {
      const li = document.createElement("li");
      li.innerHTML = `
        <label>
          <input type="checkbox" value="${player.id}" /> ${player.name}
        </label>`;
      playerListUl.appendChild(li);
    });

    modal.style.display = "flex";
    modal.setAttribute("data-tournament-id", tournamentId);
  }
});

// Close modal
document.getElementById("closeInviteModal").addEventListener("click", function () {
  document.getElementById("inviteModal").style.display = "none";
});

// Send invitations
document.getElementById("sendInvitesBtn").addEventListener("click", function () {
  const modal = document.getElementById("inviteModal");
  const tournamentId = modal.getAttribute("data-tournament-id");
  const selected = Array.from(document.querySelectorAll("#playerListToInvite input:checked"));

  selected.forEach(checkbox => {
    const playerId = checkbox.value;
    inviteToTournament(playerId, tournamentId); // from invitation.js
  });

  alert("Invitations sent successfully!");
  modal.style.display = "none";
});