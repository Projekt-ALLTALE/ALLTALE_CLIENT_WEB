export const state = () => ({
  info: {
    id: null
  }
})

export const mutations = {
  update(state, info) {
    state.info = {...state.info, ...info};
  }
}
