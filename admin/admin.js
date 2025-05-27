const loggedInUser = document.getElementById("loggedInUser");
const user = getLoggedInUser();

const renderLoggedInUser = () => {
  loggedInUser.innerHTML = `${user.username}`;
}

const deleteTournamentItem = (tournamentId) => {
  getTournaments();
  tournaments = tournaments.filter(tournamentItem => tournamentItem.id != tournamentId)
  saveTournaments();
  renderPage();
}


const renderManagedTournamentsTable = () => {
  const tournamentManageTable = document.getElementById("manage-tournaments-table-body")

  const tournamentList = getTournaments();
  let tournamentTableBody = ""
  tournamentList.map(tournamentItem => {
    tournamentTableBody += `
      <tr>
        <td>${tournamentItem.name}</td>
        <td>${tournamentItem.users.length}</td>
        <td>${tournamentItem.venue}</td>
        ${user.role == 'admin' ? `
        <td>
          <button class="btn-secondary">View</button>
          <button class="btn-secondary">Edit</button>
          <button class="btn-secondary" onclick="generateMatches(${tournamentItem.id})">Generate Matches</button>
          <button class="btn-danger" onclick="deleteTournamentItem(${tournamentItem.id})">Delete</button>
        </td>
        `
        :
        `<td>\
        <button class="btn-secondary">View</button>
        </td>`}
      </tr>
      `

  })
  tournamentManageTable.innerHTML = tournamentTableBody
}

const renderTournamentMatchesTable = () => {
  const tournamentMatchesTable = document.getElementById("tournament-matches-table-body")

  getTournaments();
  let tournamentMatchesTableBody = ""
  tournaments.map(tournamentItem => {
    for (let i = 0; i < tournamentItem.matches.length; i++) {
      for (let j = 0; j < tournamentItem.matches[i].length; j++) {
        tournamentMatchesTableBody += `
            <tr>
              <td>${tournamentItem.name}</td>
              <td>${i + 1}</td>
              <td>
              ${getUsernameById(tournamentItem.matches[i][j][0])} vs ${getUsernameById(tournamentItem.matches[i][j][1])}
              </td>
              <td>
                ${user.role == 'admin' ? `<button type="button" class="btn btn-secondary">Set Score</button>` : ''}
              </td>
            </tr>
            `
      }
    }
  })
  tournamentMatchesTable.innerHTML = tournamentMatchesTableBody
}

const getUsernameById = (userId) => {
  const user = USERS.find(user => user.id == userId);
  return user?.username || "ByPass";
}

const logout = () => {
  window.location.href = "../public/index.html";
}

const generateMatches = (tournamentId) => {
  getTournaments();
  tournaments = tournaments.map(tournamentItem => {
    if (tournamentItem.id == tournamentId) {
      const matches = generateRoundRobin([...tournamentItem.users]);
      console.log(matches)
      return {
        ...tournamentItem,
        matches: matches
      }
    }
    return tournamentItem;
  })
  saveTournaments();
  renderPage();
}

const getNumberOfActiveTournaments = () => {
  getTournaments();
  const numberOfActiveTournaments = tournaments.length;

  const numberOfActiveTournamentsTag = document.getElementById("number-of-active-tournaments");
  numberOfActiveTournamentsTag.innerText = numberOfActiveTournaments;
}

const getNumberOfParticipants = () => {
  const numberOfPaticipants = USERS.length; // This could be fixed i.e. number of total players in tournaments
  const numberOfPaticipantsTag = document.getElementById("number-of-participants");
  numberOfPaticipantsTag.innerText = numberOfPaticipants;
}

const isNewTournamentButtonVisible = () => {
  const newTournamentButton = document.getElementById('new-tournament-button');

  if (user !== 'admin') {
    newTournamentButton.classList.add('hidden');
  }
}

const renderPage = () => {
  isNewTournamentButtonVisible();
  renderLoggedInUser();
  renderManagedTournamentsTable();
  renderTournamentMatchesTable();
  getNumberOfActiveTournaments();
  getNumberOfParticipants();
}

renderPage();


