const participantInput = document.getElementById('participant-search-input');
const resultsList = document.getElementById('participant-results');
const selectedList = document.getElementById('selected-participants');

const selectedUsernames = [];
const selectedUserIds = [];

participantInput.addEventListener('input', () => {
  const query = participantInput.value.toLowerCase();
  resultsList.innerHTML = '';

  if (!query) return;

  const matches = USERS.filter(user =>
    user.username.toLowerCase().includes(query) && !selectedUsernames.includes(user.username)
  );

  matches.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.username;
    li.addEventListener('click', () => {
      selectedUsernames.push(user.username);
      selectedUserIds.push(user.id)
      updateSelectedList();
      participantInput.value = '';
      resultsList.innerHTML = '';
    });
    resultsList.appendChild(li);
  });
});

function updateSelectedList() {
  selectedList.innerHTML = '';
  selectedUsernames.forEach(username => {
    const li = document.createElement('li');
    li.textContent = username;
    selectedList.appendChild(li);
  });
}
const createTournamentSubmitButton = document.getElementById("create-tournament-submit-button")

const createNewTournament = () => {
  const tournamentName = document.getElementById("tournament-name").value;
  const tournamentDate = document.getElementById("date").value;
  const isOnline = document.getElementById("online").checked;
  const tournamentVenue = document.getElementById("venue").value;

  if (tournamentName) {
    const newTournament = {
      id: generateRandomId(),
      name: tournamentName,
      date: tournamentDate,
      venue: isOnline ? 'Online' : tournamentVenue,
      users: selectedUserIds,
      // groups: [] // this should be added later
      matches: [],
    }
    console.log(newTournament)
    createTournament(newTournament);
  }
  window.location.href = "./dashboard.html";
}

createTournamentSubmitButton.addEventListener("click", createNewTournament);