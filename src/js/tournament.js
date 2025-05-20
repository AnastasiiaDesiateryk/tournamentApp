let users = [];

const userGroups = [
  {
    groupName: "Zurich1",
    users: []
  },
  {
    groupName: "Zurich2",
    users: []
  }
]

const tournament = [{
  goupName: "Zurich1",
  matches: []
},
{
  goupName: "Zurich2",
  matches: []
},
];

const generateRandomId = () => {
  const id = Math.floor(Math.random() * 10000000)
  return id;
}

const user1 = {
  id: generateRandomId(),
  name: "User1"
}

const user2 = {
  id: generateRandomId(),
  name: "User2"
}

const user3 = {
  id: generateRandomId(),
  name: "User3"
}

const user4 = {
  id: generateRandomId(),
  name: "User4"
}

const user5 = {
  id: generateRandomId(),
  name: "User5"
}

users = [user1, user2, user3, user4, user5];

const generateRoundRobin = () => {
  // [ [ [1,2],[3,4] ], [ [1,3], [2,4] ], [ [1,4], [2,3] ] ]
  if (users.length % 2 !== 0) {
    users.push({ id: -1, name: "ByPass" });
  }
  const matches = [];
  const numRounds = users.length - 1;
  const halfSize = users.length / 2;


  const userList = users.slice();
  const fixed = userList[0];
  const rotating = userList.slice(1);

  for (let round = 0; round < numRounds; round++) {
    const roundMatches = [];
    roundMatches.push([fixed, rotating[rotating.length - 1]]);

    for (let i = 0; i < halfSize - 1; i++) {
      roundMatches.push([rotating[i], rotating[rotating.length - 2 - i]]);
    }

    matches.push(roundMatches);
    rotating.unshift(rotating.pop());
  }

  return matches;
}

function generateKnockout(users) {
  const rounds = [];
  let currentRound = [...users];

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
}