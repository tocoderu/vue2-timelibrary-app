export default {
  state: {
    message: {
      show: false,
      // error & success (TODO: warrning)
      context: 'success',
      title: ''
    }
  },
  mutations: {
    setSuccessMessage (state, payload) {
      state.message.show = true
      state.message.context = 'success'
      state.message.title = payload
    },
    setErrorMessage (state, payload) {
      state.message.show = true
      state.message.context = 'error'
      state.message.title = payload
    },
    unsetMessage (state) {
      state.message.show = false
    }
  },
  actions: {
    setErrorMessage ({commit}, payload) {
      commit('setErrorMessage', payload)
    },
    setSuccessMessage ({commit}, payload) {
      commit('setSuccessMessage', payload)
      // Mutations cant be async
      setTimeout(() => { commit('unsetMessage') }, 3000)
    }
  },
  getters: {
    message (state) {
      return state.message
    }
  }
}
