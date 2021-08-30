export const state = () => ({
  server: {
    online: null,
  },
  message: {
    lobby: [],
  }
});

export const mutations = {
  updateOnline(state, onlineObj) {
    state.server.online = JSON.parse(onlineObj).online;
  },
  putLobbyMessage(state, messageObj) {
    state.message.lobby.push(JSON.parse(messageObj));
  }
}
