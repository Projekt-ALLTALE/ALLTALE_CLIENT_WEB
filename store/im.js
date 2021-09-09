export const state = () => ({
  server: {
    online: null,
    members: null
  },
  message: {
    lobby: [],
  },
  typingMember: {
    lobby: [],
  }
});

export const mutations = {
  updateOnline(state, onlineObj) {
    state.server.online = JSON.parse(onlineObj).online;
  },
  updateMembers(state, onlineObj) {
    state.server.members = JSON.parse(onlineObj).members;
  },
  putLobbyMessage(state, messageObj) {
    state.message.lobby.push(JSON.parse(messageObj));
  },
  clearLobbyMessage(state) {
    state.message.lobby = []
  },
  updateTypingMember(state, members) {
    state.typingMember.lobby = [...members]
  }
}
