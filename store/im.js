export const state = () => ({
  message: {
    global: [],
  }
});

export const mutations = {
  putGlobalMessage(state, messageObj) {
    state.message.global.push(JSON.parse(messageObj))
  }
}
