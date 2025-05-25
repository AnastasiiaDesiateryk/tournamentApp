// === Auth & User display ===
const user = JSON.parse(localStorage.getItem("matchhub_user"));

if (!user || user.role !== "player") {
  window.location.href = "login.html";
} else {
  document.querySelector(".username").textContent = user.username;
}

// === Logout ===
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("matchhub_user");
  window.location.href = "login.html";
});

// === Match Data ===
const matches = [
  {
    group: "Group A",
    round: "Round 1",
    pitch: "Pitch 1",
    time: "10:00",
    teams: "Atalanta vs Barcelona",
    score: "1:2",
    winner: "Barcelona",
  },
  {
    group: "Group A",
    round: "Round 1",
    pitch: "Pitch 2",
    time: "10:00",
    teams: "Liverpool vs Inter",
    score: "3:0",
    winner: "Liverpool",
  },
  {
    group: "Group A",
    round: "Quarter-final",
    pitch: "Pitch 1",
    time: "10:45",
    teams: "Chelsea vs Atlético",
    score: "0:0",
    winner: "Draw",
  },
  {
    group: "Group B",
    round: "Quarter-final",
    pitch: "Pitch 2",
    time: "10:45",
    teams: "Man City vs Napoli",
    score: "2:1",
    winner: "Man City",
  },
  {
    group: "Group A",
    round: "Round 1",
    pitch: "Pitch 1",
    time: "11:30",
    teams: "Barcelona vs Chelsea",
    score: "1:0",
    winner: "Barcelona",
  },
  {
    group: "Group A",
    round: "Round 1",
    pitch: "Pitch 2",
    time: "11:30",
    teams: "Inter vs Man City",
    score: "1:3",
    winner: "Man City",
  },
  {
    group: "Group B",
    round: "Round 2",
    pitch: "Pitch 1",
    time: "12:00",
    teams: "Napoli vs Atlético",
    score: "2:2",
    winner: "Draw",
  },
  {
    group: "Group B",
    round: "Round 2",
    pitch: "Pitch 2",
    time: "12:00",
    teams: "Atalanta vs Man City",
    score: "1:3",
    winner: "Man City",
  },
  {
    group: "Group A",
    round: "Semi-final",
    pitch: "Pitch 1",
    time: "13:00",
    teams: "Liverpool vs Chelsea",
    score: "1:1",
    winner: "Draw",
  },
  {
    group: "Group B",
    round: "Semi-final",
    pitch: "Pitch 2",
    time: "13:00",
    teams: "Barcelona vs Napoli",
    score: "3:2",
    winner: "Barcelona",
  },
  {
    group: "Group A",
    round: "Final",
    pitch: "Pitch 1",
    time: "14:00",
    teams: "Barcelona vs Liverpool",
    score: "2:0",
    winner: "Barcelona",
  },
  {
    group: "Group B",
    round: "Final",
    pitch: "Pitch 2",
    time: "14:00",
    teams: "Man City vs Atlético",
    score: "1:1",
    winner: "Draw",
  },
  {
    group: "Group A",
    round: "3rd Place",
    pitch: "Pitch 1",
    time: "15:00",
    teams: "Chelsea vs Napoli",
    score: "0:1",
    winner: "Napoli",
  },
  {
    group: "Group B",
    round: "3rd Place",
    pitch: "Pitch 2",
    time: "15:00",
    teams: "Inter vs Atalanta",
    score: "2:2",
    winner: "Draw",
  },
  {
    group: "Group A",
    round: "Consolation",
    pitch: "Pitch 1",
    time: "16:00",
    teams: "Chelsea vs Atalanta",
    score: "1:2",
    winner: "Atalanta",
  },
  {
    group: "Group B",
    round: "Consolation",
    pitch: "Pitch 2",
    time: "16:00",
    teams: "Napoli vs Inter",
    score: "0:3",
    winner: "Inter",
  },
  {
    group: "Group A",
    round: "Bonus Match",
    pitch: "Pitch 1",
    time: "17:00",
    teams: "Barcelona vs Atlético",
    score: "3:1",
    winner: "Barcelona",
  },
  {
    group: "Group B",
    round: "Bonus Match",
    pitch: "Pitch 2",
    time: "17:00",
    teams: "Man City vs Liverpool",
    score: "2:2",
    winner: "Draw",
  },
  {
    group: "Group A",
    round: "Late Game",
    pitch: "Pitch 1",
    time: "20:00",
    teams: "Barcelona vs Inter",
    score: "1:1",
    winner: "Draw",
  },
  {
    group: "Group B",
    round: "Late Game",
    pitch: "Pitch 2",
    time: "20:00",
    teams: "Chelsea vs Man City",
    score: "0:2",
    winner: "Man City",
  },
  {
    group: "Group A",
    round: "Night Showdown",
    pitch: "Pitch 1",
    time: "21:00",
    teams: "Atlético vs Liverpool",
    score: "1:4",
    winner: "Liverpool",
  },
  {
    group: "Group B",
    round: "Night Showdown",
    pitch: "Pitch 2",
    time: "21:00",
    teams: "Napoli vs Atalanta",
    score: "2:2",
    winner: "Draw",
  },
  {
    group: "Group A",
    round: "Closing Match",
    pitch: "Pitch 1",
    time: "22:00",
    teams: "Barcelona vs Man City",
    score: "1:0",
    winner: "Barcelona",
  },
  {
    group: "Group B",
    round: "Closing Match",
    pitch: "Pitch 2",
    time: "22:00",
    teams: "Inter vs Atlético",
    score: "1:1",
    winner: "Draw",
  },
  {
    group: "Group A",
    round: "Final Show",
    pitch: "Pitch 1",
    time: "23:00",
    teams: "Liverpool vs Napoli",
    score: "2:1",
    winner: "Liverpool",
  },
  {
    group: "Group B",
    round: "Final Show",
    pitch: "Pitch 2",
    time: "23:00",
    teams: "Chelsea vs Inter",
    score: "0:0",
    winner: "Draw",
  },
];

// === Utility ===
function isMatchLive(matchTimeStr) {
  const now = new Date();
  const [hours, minutes] = matchTimeStr.split(":").map(Number);
  const matchStart = new Date();
  matchStart.setHours(hours, minutes, 0, 0);
  const matchEnd = new Date(matchStart.getTime() + 45 * 60 * 1000);
  return now >= matchStart && now <= matchEnd;
}

async function getFlagEmoji(team) {
  const teamToCountry = {
    barcelona: "Spain",
    atalanta: "Italy",
    inter: "Italy",
    chelsea: "United Kingdom",
    atlético: "Spain",
    liverpool: "United Kingdom",
    "man city": "United Kingdom",
    napoli: "Italy",
  };

  const key = Object.keys(teamToCountry).find((k) =>
    team.toLowerCase().includes(k)
  );
  if (!key) return "🌿";
  const country = teamToCountry[key];

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    return data[0]?.flag || "🌿";
  } catch (e) {
    return "🌿";
  }
}

async function getTeamFlagsHTML(teamName) {
  const [team1, team2] = teamName.split(" vs ");
  const flag1 = await getFlagEmoji(team1);
  const flag2 = await getFlagEmoji(team2);
  return `${flag1} ${team1} vs ${flag2} ${team2}`;
}

// === DOM References ===
const [groupSelect, roundSelect, pitchSelect] = document.querySelectorAll(
  ".filter-panel select"
);
const clearBtn = document.querySelector(".clear");

// === Populate Filters ===
function populateFilters() {
  const unique = (arr) => [...new Set(arr)];

  const groups = unique(matches.map((m) => m.group));
  const rounds = unique(matches.map((m) => m.round));
  const pitches = unique(matches.map((m) => m.pitch));

  const fillSelect = (select, options, label) => {
    select.innerHTML = `<option value="">All ${label}</option>`;
    options.forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
  };

  fillSelect(groupSelect, groups, "Groups");
  fillSelect(roundSelect, rounds, "Rounds");
  fillSelect(pitchSelect, pitches, "Pitches");
}

// === Render Schedule to Fields ===
async function renderSchedule(filteredMatches) {
  const fields = document.querySelector(".fields");
  fields.innerHTML = "";

  const pitches = [...new Set(filteredMatches.map((m) => m.pitch))];

  for (const pitch of pitches) {
    const column = document.createElement("div");
    column.className = "field-column";
    column.innerHTML = `<h5>${pitch}</h5><ul></ul>`;
    const ul = column.querySelector("ul");

    for (const match of filteredMatches.filter((m) => m.pitch === pitch)) {
      const li = document.createElement("li");
      const isLive = isMatchLive(match.time);
      const badge = isLive
        ? '<span class="badge badge-live me-1">Live</span>'
        : "";

      const flagText = await getTeamFlagsHTML(match.teams);
      const line1 = `<div><strong>${match.time}</strong> – ${flagText}</div>`;
      const line2 = `
            <div class="mt-1">
              <span class="badge bg-primary me-1">${match.round}</span>
              <span class="badge bg-info text-dark">${match.group}</span>
            </div>
          `;

      li.innerHTML = `${badge}${line1}${line2}`;
      ul.appendChild(li);
    }

    fields.appendChild(column);
  }
}

// === Apply Filters ===
function applyFilters() {
  const group = groupSelect.value;
  const round = roundSelect.value;
  const pitch = pitchSelect.value;

  localStorage.setItem(
    "matchhub_filters",
    JSON.stringify({ group, round, pitch })
  );

  const filtered = matches.filter((m) => {
    const matchGroup = !group || m.group === group;
    const matchRound = !round || m.round === round;
    const matchPitch = !pitch || m.pitch === pitch;
    return matchGroup && matchRound && matchPitch;
  });

  renderSchedule(filtered);
}

// === Restore Filters and Load ===
document.addEventListener("DOMContentLoaded", () => {
  populateFilters();

  const savedFilters = JSON.parse(localStorage.getItem("matchhub_filters"));
  if (savedFilters) {
    if (savedFilters.group) groupSelect.value = savedFilters.group;
    if (savedFilters.round) roundSelect.value = savedFilters.round;
    if (savedFilters.pitch) pitchSelect.value = savedFilters.pitch;
  }

  applyFilters();
});

// === Event Listeners for Filters ===
groupSelect.addEventListener("change", applyFilters);
roundSelect.addEventListener("change", applyFilters);
pitchSelect.addEventListener("change", applyFilters);

clearBtn.addEventListener("click", () => {
  groupSelect.selectedIndex = 0;
  roundSelect.selectedIndex = 0;
  pitchSelect.selectedIndex = 0;
  localStorage.removeItem("matchhub_filters");
  renderSchedule(matches);
});

// === Section Switching ===
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = link.getAttribute("data-section");

    document
      .querySelectorAll(".page-section")
      .forEach((sec) => sec.classList.add("d-none"));
    const target = document.getElementById(`${section}-section`);
    target.classList.remove("d-none");
    target.classList.add("fade-in");
    setTimeout(() => target.classList.remove("fade-in"), 500);

    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// === Matches and Results Rendering ===
document
  .querySelector('[data-section="matches"]')
  .addEventListener("click", renderAllMatches);
document
  .querySelector('[data-section="results"]')
  .addEventListener("click", renderResults);

function renderAllMatches() {
  const container = document.getElementById("matches-list");
  container.innerHTML = "";
  matches.forEach(async (m) => {
    const div = document.createElement("div");
    div.className = "border p-2 mb-2 bg-light";
    const isLive = isMatchLive(m.time);
    const badge = isLive ? '<span class="badge badge-live">Live</span> ' : "";
    const flagText = await getTeamFlagsHTML(m.teams);
    div.innerHTML = `${badge}<strong>${m.time}</strong> | ${flagText} <span class="text-muted">(${m.pitch})</span>`;
    container.appendChild(div);
  });
}

function renderResults() {
  const table = document.getElementById("results-table");
  table.innerHTML = "";

  const resultsByGroup = {};
  const globalResults = {};

  matches.forEach(({ group, winner }) => {
    if (winner === "Draw") return;

    if (!resultsByGroup[group]) resultsByGroup[group] = {};
    resultsByGroup[group][winner] = (resultsByGroup[group][winner] || 0) + 1;

    globalResults[winner] = (globalResults[winner] || 0) + 1;
  });

  // === Grouped Results ===
  Object.keys(resultsByGroup).forEach((group) => {
    const div = document.createElement("div");
    div.innerHTML = `<h5>Group: ${group}</h5>`;
    const ul = document.createElement("ul");

    Object.entries(resultsByGroup[group])
      .sort((a, b) => b[1] - a[1])
      .forEach(([team, wins]) => {
        const li = document.createElement("li");
        li.textContent = `${team} - ${wins} win(s)`;
        ul.appendChild(li);
      });

    div.appendChild(ul);
    table.appendChild(div);
  });

  // === Global Results ===
  const globalDiv = document.createElement("div");
  globalDiv.innerHTML = `<h5 class="mt-4">🌍 Global Standings</h5>`;
  const globalUl = document.createElement("ul");

  Object.entries(globalResults)
    .sort((a, b) => b[1] - a[1])
    .forEach(([team, wins]) => {
      const li = document.createElement("li");
      li.textContent = `${team} - ${wins} win(s) total`;
      globalUl.appendChild(li);
    });

  globalDiv.appendChild(globalUl);
  table.appendChild(globalDiv);
}
