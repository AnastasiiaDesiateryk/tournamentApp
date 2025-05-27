//Constant variables


// Admin to User

function inviteToTournament(userId, tournamentId) {
  getTournamentInvitations();
  const invitation = {
    id: generateRandomId(),
    status: InvitationStatus.PENDING,
    tournamentId: tournamentId,
    userId: userId
  }
  tournamentInvitations.push(invitation);
  saveTournamentInvitations()
}

function acceptTournamentInvitation(invitationId) {
  updateTournamentInvitationStatus(invitationId, InvitationStatus.ACCEPTED)
  const invitation = tournamentInvitations.find(item => item.id == invitationId);
  addUserToTournament(invitation.userId, invitation.tournamentId);
}

const rejectTournamentInvitation = (invitationId) => {
  updateTournamentInvitationStatus(invitationId, InvitationStatus.REJECTED)
}

const updateTournamentInvitationStatus = (invitationId, invitationStatus) => {
  getTournamentInvitations();
  tournamentInvitations = tournamentInvitations.map(invitation => {
    if (invitation.id == invitationId) {
      invitation.status = invitationStatus
    }
    return invitation;
  })
  saveTournamentInvitations();
}

// GROUP
const inviteToGroup = (tournamentId, groupId, userId) => {
  getGroupInvitations();
  const newGroupInvitation = {
    id: generateRandomId(),
    status: InvitationStatus.PENDING,
    groupId: groupId,
    userId: userId,
    tournamentId: tournamentId
  }
  groupInvitations.push(newGroupInvitation);
  saveGroupInvitations()
}

function acceptGroupInvitation(invitationId) {
  updateGroupInvitationStatus(invitationId, InvitationStatus.ACCEPTED)
  const invitation = groupInvitations.find(item => item.id == invitationId);
  addUserToGroup(invitation.tournamentId, invitation.groupId, invitation.userId);
}

const rejectGroupInvitation = (invitationId) => {
  updateGroupInvitationStatus(invitationId, InvitationStatus.REJECTED)
}

const updateGroupInvitationStatus = (invitationId, invitationStatus) => {
  getGroupInvitations();
  groupInvitations = groupInvitations.map(invitation => {
    if (invitation.id == invitationId) {
      return {
        ...invitation,
        status: invitationStatus
      }
    }
    return invitation;
  })
  saveGroupInvitations();
}


const createGroup = (tournamentId, newGroupName) => {
  getTournaments();
  tournaments = tournaments.map(tournament => {
    if (tournament.id == tournamentId) {
      const existingGroup = tournament.groups.find(group => group.name === newGroupName);
      if (!existingGroup) {
        const newGroup = {
          id: generateRandomId(),
          name: newGroupName,
          users: []
        }
        return {
          ...tournament,
          groups: [...tournament.groups, newGroup]
        }
      }
    }
    return tournament;
  })
  saveTournaments();
};

const addUserToGroup = (tournamentId, groupId, userId) => {
  getTournaments();
  tournaments = tournaments.map(tournament => {
    if (tournament.id == tournamentId) {
      return {
        ...tournament,
        groups: tournament.groups.map(group => {
          if (group.id == groupId) {
            return {
              ...group,
              users: [...group.users, userId]
            }
          }
          return group;
        })
      }
    }
    return tournament;
  })
  saveTournaments();
}

// createTournament("Test", "01.01.2026");
// saveUsers();
// createGroup("2535976", "TestGroup");
// inviteToTournament("9004476", "2535976");
// acceptTournamentInvitation("3678558");
// inviteToGroup("2535976", "9147898", "9004476");
// acceptGroupInvitation("7383936");
getTournaments();
console.log(generateRoundRobin(tournaments[1].groups[0].users));