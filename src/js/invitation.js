let invitations = [];
const INVITATION_KEY = "INVITATIONS";

let tournamentInvitations = [];
const TOURNAMENT_INVITATION_KEY = "TOURNAMENT_INVITATIONS";

//Constant variables
const InvitationStatus = {
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  PENDING: "PENDING"
}

function saveInvitations() {
  localStorage.setItem(INVITATION_KEY, JSON.stringify(invitations))
}

function getInvitations() {
  const localInvitations = localStorage.getItem(INVITATION_KEY)
  if (localInvitations != null) {
    invitations = JSON.parse(localInvitations)
  }
}

function getTournamentInvitations() {
  const localInvitations = localStorage.getItem(TOURNAMENT_INVITATION_KEY)
  if (localInvitations != null) {
    invitations = JSON.parse(localInvitations)
  }
}

function invite(inviter, invitee) {
  getInvitations();
  const invitation = {
    id: Math.floor(Math.random() * 10000000),
    status: InvitationStatus.PENDING,
    invitee: invitee,
    inviter: inviter
  }
  invitations.push(invitation);
  localStorage.setItem(INVITATION_KEY, JSON.stringify(invitations))
}

function inviteToTournament(invitee, tournamentId) {
  getTournamentInvitations();
  const invitation = {
    id: Math.floor(Math.random() * 10000000),
    status: InvitationStatus.PENDING,
    tournamentId: tournamentId,
    invitee: invitee
  }
  tournamentInvitations.push(invitation);
  localStorage.setItem(TOURNAMENT_INVITATION_KEY, JSON.stringify(tournamentInvitations))
}

function acceptInvitation(invitationId) {
  updateInvitationStatus(invitationId, InvitationStatus.ACCEPTED)
}

const rejectInvitation = (invitationId) => {
  updateInvitationStatus(invitationId, InvitationStatus.REJECTED)
}

const updateInvitationStatus = (invitationId, invitationStatus) => {
  getInvitations();
  invitations = invitations.map(invitation => {
    if (invitation.id == invitationId) {
      invitation.status = invitationStatus
    }
    return invitation;
  })
  localStorage.setItem(INVITATION_KEY, JSON.stringify(invitations))
}


function acceptTournamentInvitation(invitationId) {
  updateTournamentInvitationStatus(invitationId, InvitationStatus.ACCEPTED)
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
  localStorage.setItem(TOURNAMENT_INVITATION_KEY, JSON.stringify(tournamentInvitations))
}