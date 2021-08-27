export const state = () => ({
  status: {
    connected: false,
    serverInfo: {}
  }
});

export const mutations = {
  updateStatus(state, isConnected) {
    state.status.connected = isConnected;
  },
  updateServerInfo(state, serverInfo) {
    state.status.serverInfo = {...state.status.serverInfo, ...serverInfo};
  }
}
