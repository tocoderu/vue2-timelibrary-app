// Example method

async method ({commit}, payload) {
  commit('clearError')
  commit('setLoading', true)
  try {
    // done logic here

    commit('setLoading', false)
  } catch (error) {
    // error logic here

    commit('setLoading', false)
    commit('setError', error.message)
    throw error
  }
}
