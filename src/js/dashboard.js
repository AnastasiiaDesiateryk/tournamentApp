document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("matchhub_user"));
  
    if (!user || user.role !== "player") {
      alert("Unauthorized access.");
      window.location.href = "../../src/views/login.html";
      return;
    }
  
    getTournamentInvitations(); // loads into tournamentInvitations[]
    const userInvites = tournamentInvitations.filter(inv => inv.userId === user.id);
  
    const container = document.getElementById("tournamentInvitations");
    if (!container) return;
  
    if (userInvites.length === 0) {
      container.innerHTML = "<p>You have no tournament invitations.</p>";
      return;
    }
  
    container.innerHTML = "";
    userInvites.forEach(inv => {
      const card = document.createElement("div");
      card.className = "invitation-card";
      card.innerHTML = `
        <p><strong>Tournament ID:</strong> ${inv.tournamentId}</p>
        <p><strong>Status:</strong> ${inv.status}</p>
        ${
          inv.status === "PENDING"
            ? `<button onclick="acceptTournamentInvitation('${inv.id}')">Accept</button>
               <button onclick="rejectTournamentInvitation('${inv.id}')">Reject</button>`
            : ""
        }
      `;
      container.appendChild(card);
    });
  });