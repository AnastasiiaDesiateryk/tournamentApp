const loggedInUser = document.getElementById("loggedInUser");
const user = getLoggedInUser();

const renderLoggedInUser = () => {
  loggedInUser.innerHTML = `${user.username}`;
};

const deleteTournamentItem = (tournamentId) => {
  getTournaments();
  tournaments = tournaments.filter(
    (tournamentItem) => tournamentItem.id != tournamentId
  );
  saveTournaments();
  renderPage();
};

const renderManagedTournamentsTable = () => {
  const tournamentManageTable = document.getElementById("manage-tournaments-table-body");
  const tournamentList = getTournaments();
  let tournamentTableBody = "";

  tournamentList.map((tournamentItem) => {
    tournamentTableBody += `
      <tr>
        <td>${tournamentItem.name}</td>
        <td>${tournamentItem.users.length}</td>
        <td>${tournamentItem.venue}</td>
        ${
          user.role == "admin"
            ? `
        <td>
          <button class="btn-secondary">Edit</button>
          <button class="btn-secondary" onclick="generateMatches(${tournamentItem.id})">Generate Matches</button>
          <button class="btn-danger" onclick="deleteTournamentItem(${tournamentItem.id})">Delete</button>
        </td>`
            : `<td><button class="btn-secondary">View</button></td>`
        }
      </tr>
    `;
  });

  tournamentManageTable.innerHTML = tournamentTableBody;
};

const renderTournamentMatchesTable = () => {
  const tournamentMatchesTable = document.getElementById("tournament-matches-table-body");
  getTournaments();
  let tournamentMatchesTableBody = "";

  tournaments.map((tournamentItem) => {
    for (let i = 0; i < tournamentItem.matches.length; i++) {
      for (let j = 0; j < tournamentItem.matches[i].length; j++) {
        const match = tournamentItem.matches[i][j];
        const score1 = match[2] ?? "";
        const score2 = match[3] ?? "";
        tournamentMatchesTableBody += `
          <tr>
            <td>${tournamentItem.name}</td>
            <td>${i + 1}</td>
            <td>${getUsernameById(match[0])} vs ${getUsernameById(match[1])}</td>
            <td>
              ${
                user.role == "admin"
                  ? `<button type="button" class="btn btn-secondary" onclick="setScore(this)">Set Score</button>
                     <span style="margin-left:10px;">${score1 !== "" && score2 !== "" ? `${score1} - ${score2}` : ""}</span>`
                  : score1 !== "" && score2 !== "" ? `${score1} - ${score2}` : ""
              }
            </td>
          </tr>
        `;
      }
    }
  });

  tournamentMatchesTable.innerHTML = tournamentMatchesTableBody;
};

const getUsernameById = (userId) => {
  const user = USERS.find((user) => user.id == userId);
  return user?.username || "Unknown";
};

const logout = () => {
  window.location.href = "../public/index.html";
};

const generateMatches = (tournamentId) => {
  getTournaments();
  tournaments = tournaments.map((tournamentItem) => {
    if (tournamentItem.id == tournamentId) {
      const matches = generateRoundRobin(tournamentItem.users.map(String));
      return {
        ...tournamentItem,
        matches: matches,
      };
    }
    return tournamentItem;
  });
  saveTournaments();
  renderPage();
};

const getNumberOfActiveTournaments = () => {
  getTournaments();
  const numberOfActiveTournaments = tournaments.length;
  document.getElementById("number-of-active-tournaments").innerText = numberOfActiveTournaments;
};

const getNumberOfParticipants = () => {
  const numberOfPaticipants = USERS.length;
  document.getElementById("number-of-participants").innerText = numberOfPaticipants;
};

const isNewTournamentButtonVisible = () => {
  const newTournamentButton = document.getElementById("new-tournament-button");
  if (user.role !== "admin") {
    newTournamentButton.classList.add("hidden");
  }
};

const renderPage = () => {
  isNewTournamentButtonVisible();
  renderLoggedInUser();
  renderManagedTournamentsTable();
  renderTournamentMatchesTable();
  getNumberOfActiveTournaments();
  getNumberOfParticipants();
};

// === Score Entry Handler ===
window.setScore = function (buttonElement) {
  const row = buttonElement.closest("tr");
  const tournamentName = row.children[0].textContent.trim();
  const round = parseInt(row.children[1].textContent.trim()) - 1;
  const [player1, player2] = row.children[2].textContent.split(" vs ").map(x => x.trim());

  const input = prompt("Enter score as '3-2':");
  if (!input || !input.includes("-")) {
    alert("Invalid format. Use '3-2'");
    return;
  }

  const [s1, s2] = input.split("-").map(x => x.trim());
  if (!/^\d+$/.test(s1) || !/^\d+$/.test(s2)) {
    alert("Scores must be natural numbers.");
    return;
  }

  const tournaments = getTournaments();
  const tournament = tournaments.find(t => t.name === tournamentName);
  if (!tournament || !tournament.matches || !tournament.matches[round]) {
    alert("Tournament or round not found.");
    return;
  }

  const match = tournament.matches[round].find(m => {
    const u1 = getUsernameById(m[0]);
    const u2 = getUsernameById(m[1]);
    return (u1 === player1 && u2 === player2) || (u1 === player2 && u2 === player1);
  });

  if (!match) {
    alert("Match not found.");
    return;
  }

  match[2] = parseInt(s1);
  match[3] = parseInt(s2);

  saveTournaments();
  renderPage();
};

renderPage();