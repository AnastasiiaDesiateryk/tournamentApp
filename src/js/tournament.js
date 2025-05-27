// tournament.js

const TOURNAMENTS_KEY = "TOURNAMENTS";
let players = [];
let tournaments = [];

const generateRandomId = () => {
  return Math.floor(Math.random() * 10000000).toString();
};

// Dummy players
players = Array.from({ length: 10 }, (_, i) => ({
  id: generateRandomId(),
  name: `Player ${i + 1}`
}));

const getTournaments = () => {
  const tempTournaments = localStorage.getItem(TOURNAMENTS_KEY);
  if (tempTournaments) {
    tournaments = JSON.parse(tempTournaments);
  }
  return tournaments;
};

const saveTournaments = () => {
  localStorage.setItem(TOURNAMENTS_KEY, JSON.stringify(tournaments));
};

const createTournament = (title, date, type, location, description) => {
  getTournaments();
  const newTournament = {
    id: generateRandomId(),
    title,
    date,
    type,
    location,
    description,
    players: [],
    groups: []
  };
  tournaments.push(newTournament);
  saveTournaments();
};

const addPlayerToTournament = (playerId, tournamentId) => {
  getTournaments();
  tournaments = tournaments.map(t => {
    if (t.id == tournamentId && !t.players.includes(playerId)) {
      return { ...t, players: [...t.players, playerId] };
    }
    return t;
  });
  saveTournaments();
};

const generateRoundRobin = (players) => {
  if (players.length % 2 !== 0) {
    players.push("-1");
  }
  const matches = [];
  const numRounds = players.length - 1;
  const halfSize = players.length / 2;

  const playerList = players.slice();
  const fixed = playerList[0];
  const rotating = playerList.slice(1);

  for (let round = 0; round < numRounds; round++) {
    const roundMatches = [[fixed, rotating[rotating.length - 1]]];

    for (let i = 0; i < halfSize - 1; i++) {
      roundMatches.push([rotating[i], rotating[rotating.length - 2 - i]]);
    }

    matches.push(roundMatches);
    rotating.unshift(rotating.pop());
  }

  return matches;
};

const generateKnockout = (players) => {
  const rounds = [];
  let currentRound = [...players];

  if (currentRound.length % 2 !== 0) {
    currentRound.push({ id: -1, name: "ByPass" });
  }

  while (currentRound.length > 1) {
    const nextRound = [];
    const matches = [];

    for (let i = 0; i < currentRound.length; i += 2) {
      const team1 = currentRound[i];
      const team2 = currentRound[i + 1];
      matches.push([team1, team2]);

      const winner = team2 === "BYE" ? team1 : team1 === "BYE" ? team2 : Math.random() > 0.5 ? team1 : team2;
      nextRound.push(winner);
    }

    rounds.push(matches);
    currentRound = nextRound;

    if (currentRound.length % 2 !== 0 && currentRound.length > 1) {
      currentRound.push("BYE");
    }
  }

  return rounds;
};

const displayMatchesForTournament = (tournament) => {
  const container = document.getElementById("matchList");
  container.innerHTML = "";

  let matches = [];
  if (tournament.type === "Round Robin") {
    matches = generateRoundRobin(tournament.players);
  } else if (tournament.type === "Knockout") {
    matches = generateKnockout(tournament.players);
  }

  matches.forEach((round, roundIndex) => {
    const roundDiv = document.createElement("div");
    roundDiv.innerHTML = `<h4>Round ${roundIndex + 1}</h4>`;
    round.forEach(([p1, p2]) => {
      const player1 = players.find(p => p.id == p1 || p.name === p1)?.name || "TBD";
      const player2 = players.find(p => p.id == p2 || p.name === p2)?.name || "TBD";
      const match = document.createElement("p");
      match.textContent = `${player1} vs ${player2}`;
      roundDiv.appendChild(match);
    });
    container.appendChild(roundDiv);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", function () {
      window.location.href = "admin.html";
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const tournamentId = urlParams.get("id");

  const tournaments = getTournaments();
  const tournament = tournaments.find(t => t.id === tournamentId);

  if (tournament) {
    document.getElementById("tournamentName").textContent = tournament.title;
    document.getElementById("overviewType").textContent = tournament.type || "N/A";
    document.getElementById("overviewLocation").textContent = tournament.location || "N/A";
    document.getElementById("overviewDate").textContent = tournament.date || "N/A";
    document.getElementById("overviewDescription").textContent = tournament.description || "N/A";

    const playerList = document.getElementById("playerList");
    playerList.innerHTML = "";
    tournament.players.forEach(playerId => {
      const player = players.find(p => p.id == playerId);
      if (player) {
        const li = document.createElement("li");
        li.textContent = player.name;
        playerList.appendChild(li);
      }
    });

    displayMatchesForTournament(tournament);
  }
});