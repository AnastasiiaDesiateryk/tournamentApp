// Local Storage Keys
const GROUP_INVITATION_KEY = "GROUP_INVITATIONS";
const TOURNAMENT_INVITATION_KEY = "TOURNAMENT_INVITATIONS";
const TOURNAMENTS_KEY = "TOURNAMENTS";
const USERS_KEY = "USERS";
const LOGGED_IN_USER_KEY = "LOGGED_IN_USER";

// Login Users
const USERS = [
  { id: "0", username: "admin", password: "matchHub", role: "admin" },
  { id: "1", username: "player1", password: "player123", role: "player" },
  { id: "2", username: "player2", password: "player123", role: "player" },
  { id: "3", username: "player3", password: "player123", role: "player" },
  { id: "4", username: "player4", password: "player123", role: "player" },
  { id: "5", username: "player5", password: "player123", role: "player" },
  { id: "6", username: "player6", password: "player123", role: "player" },
  { id: "7", username: "player7", password: "player123", role: "player" },
  { id: "8", username: "player8", password: "player123", role: "player" },
  { id: "9", username: "player9", password: "player123", role: "player" },
  { id: "10", username: "player10", password: "player123", role: "player" }

];


// Tournaments
let tournaments = [];
let tournamentInvitations = [];

// Groups
let groupInvitations = [];


const getTournaments = () => {
  const tempTournaments = localStorage.getItem(TOURNAMENTS_KEY);
  if (tempTournaments) {
    tournaments = JSON.parse(tempTournaments);
  }
  return tournaments;
}
const saveTournaments = () => {
  localStorage.setItem(TOURNAMENTS_KEY, JSON.stringify(tournaments));
}

function saveGroupInvitations() {
  localStorage.setItem(GROUP_INVITATION_KEY, JSON.stringify(groupInvitations))
}

function getGroupInvitations() {
  const localInvitations = localStorage.getItem(GROUP_INVITATION_KEY)
  if (localInvitations != null) {
    groupInvitations = JSON.parse(localInvitations)
  }
}

function saveTournamentInvitations() {
  localStorage.setItem(TOURNAMENT_INVITATION_KEY, JSON.stringify(tournamentInvitations))
}

function getTournamentInvitations() {
  const localInvitations = localStorage.getItem(TOURNAMENT_INVITATION_KEY)
  if (localInvitations != null) {
    tournamentInvitations = JSON.parse(localInvitations)
  }
}

const saveUsers = () => {
  const tempUsers = localStorage.getItem(USERS_KEY);
  if (tempUsers) {
    users = JSON.parse(tempUsers);
  }
}

const saveLoggedInUser = (user) => {
  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
}

const getLoggedInUser = () => {
  const loggedInUser = localStorage.getItem(LOGGED_IN_USER_KEY);
  if (loggedInUser) {
    console.log(loggedInUser)
    return JSON.parse(loggedInUser);
  }
  return null;
}
