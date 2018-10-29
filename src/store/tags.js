import firebase from 'firebase/app'

import Tag from './tag_help'

export default {
  state: {
    tags: []
  },
  mutations: {
    loadTags (state, payload) {
      state.tags = payload
    },
    newTag (state, payload) {
      state.tags.push(payload)
    }
  },
  actions: {
    // Load all TAGS
    async loadTags ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // Get tag
        const tag = await firebase.database().ref('tags').once('value')
        // Get value
        const tags = tag.val()
        // New array
        const tagsArray = []
        // Get task key (id)
        Object.keys(tags).forEach(key => {
          const t = tags[key]
          tagsArray.push(
            new Tag(
              t.title,
              t.use,
              t.user,
              key
            )
          )
        })
        // Send mutation
        commit('loadTags', tagsArray)

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    // Add New Tag
    async newTag ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // Used helped class
        const newTag = new Tag(
          payload.title,
          payload.use,
          getters.user.id
        )
        // Push newTag
        const tag = await firebase.database().ref('tags').push(newTag)

        // Send mutation
        commit('newTag', {
          ...newTag,
          id: tag.key
        })

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    // Delete Tag (button)
    async deleteTag ({commit}, id) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('tags').child(id).remove()

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    // Get All user Tags
    tags (state, getters) {
      return state.tags.filter(tag => {
        return tag.user === getters.user.id
      })
    }
  }
}
