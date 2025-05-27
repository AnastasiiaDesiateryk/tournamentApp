// Invitation logic for tournaments and groups

const GROUP_INVITATION_KEY = "GROUP_INVITATIONS";
const TOURNAMENT_INVITATION_KEY = "TOURNAMENT_INVITATIONS";

let groupInvitations = [];
let tournamentInvitations = [];

// Status constants for invitations
const InvitationStatus = {
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  PENDING: "PENDING"
};

// Save the list of tournament invitations to localStorage
function saveTournamentInvitations() {
  localStorage.setItem(TOURNAMENT_INVITATION_KEY, JSON.stringify(tournamentInvitations));
}

// Load the list of tournament invitations from localStorage
function getTournamentInvitations() {
  const localInvitations = localStorage.getItem(TOURNAMENT_INVITATION_KEY);
  if (localInvitations != null) {
    tournamentInvitations = JSON.parse(localInvitations);
  }
}

// Save the list of group invitations to localStorage
function saveGroupInvitations() {
  localStorage.setItem(GROUP_INVITATION_KEY, JSON.stringify(groupInvitations));
}

// Load the list of group invitations from localStorage
function getGroupInvitations() {
  const localInvitations = localStorage.getItem(GROUP_INVITATION_KEY);
  if (localInvitations != null) {
    groupInvitations = JSON.parse(localInvitations);
  }
}

// Admin sends an invitation to a user to join a tournament
function inviteToTournament(userId, tournamentId) {
  getTournamentInvitations();
  const invitation = {
    id: generateRandomId(),
    status: InvitationStatus.PENDING,
    tournamentId: tournamentId,
    userId: userId
  };
  tournamentInvitations.push(invitation);
  saveTournamentInvitations();
}

// User accepts the invitation to join a tournament
function acceptTournamentInvitation(invitationId) {
  updateTournamentInvitationStatus(invitationId, InvitationStatus.ACCEPTED);
  const invitation = tournamentInvitations.find(item => item.id == invitationId);
  addUserToTournament(invitation.userId, invitation.tournamentId);
}

// User rejects the invitation to join a tournament
function rejectTournamentInvitation(invitationId) {
  updateTournamentInvitationStatus(invitationId, InvitationStatus.REJECTED);
}

// Update the status (e.g., accepted or rejected) of a tournament invitation
function updateTournamentInvitationStatus(invitationId, invitationStatus) {
  getTournamentInvitations();
  tournamentInvitations = tournamentInvitations.map(invitation => {
    if (invitation.id == invitationId) {
      invitation.status = invitationStatus;
    }
    return invitation;
  });
  saveTournamentInvitations();
}

// Admin sends an invitation to a user to join a specific group in a tournament
function inviteToGroup(tournamentId, groupId, userId) {
  getGroupInvitations();
  const newGroupInvitation = {
    id: generateRandomId(),
    status: InvitationStatus.PENDING,
    groupId: groupId,
    userId: userId,
    tournamentId: tournamentId
  };
  groupInvitations.push(newGroupInvitation);
  saveGroupInvitations();
}

// User accepts the invitation to join a group
function acceptGroupInvitation(invitationId) {
  updateGroupInvitationStatus(invitationId, InvitationStatus.ACCEPTED);
  const invitation = groupInvitations.find(item => item.id == invitationId);
  addUserToGroup(invitation.tournamentId, invitation.groupId, invitation.userId);
}

// User rejects the invitation to join a group
function rejectGroupInvitation(invitationId) {
  updateGroupInvitationStatus(invitationId, InvitationStatus.REJECTED);
}

// Update the status (e.g., accepted or rejected) of a group invitation
function updateGroupInvitationStatus(invitationId, invitationStatus) {
  getGroupInvitations();
  groupInvitations = groupInvitations.map(invitation => {
    if (invitation.id == invitationId) {
      return {
        ...invitation,
        status: invitationStatus
      };
    }
    return invitation;
  });
  saveGroupInvitations();
}

// Create a group inside a specific tournament (if not already exists)
function createGroup(tournamentId, newGroupName) {
  getTournaments();
  tournaments = tournaments.map(tournament => {
    if (tournament.id == tournamentId) {
      const existingGroup = tournament.groups.find(group => group.name === newGroupName);
      if (!existingGroup) {
        const newGroup = {
          id: generateRandomId(),
          name: newGroupName,
          users: []
        };
        return {
          ...tournament,
          groups: [...tournament.groups, newGroup]
        };
      }
    }
    return tournament;
  });
  saveTournaments();
}

// Add a user to a specific group inside a tournament
function addUserToGroup(tournamentId, groupId, userId) {
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
            };
          }
          return group;
        })
      };
    }
    return tournament;
  });
  saveTournaments();
}