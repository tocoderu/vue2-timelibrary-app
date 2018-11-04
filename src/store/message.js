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
    getMessage (state, {context, title}) {
      state.message.show = true
      state.message.context = context
      state.message.title = title
    },
    hideMessage (state) {
      state.message.show = false
    }
  },
  actions: {
    getMessage ({commit}, {context, title}) {
      commit('getMessage', {context, title})
      // Mutations cant be async
      setTimeout(() => {
        commit('hideMessage')
      }, 2000)
    }
  },
  getters: {
    message (state) {
      return state.message
    }
  }
}
