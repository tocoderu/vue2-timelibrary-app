import { firebase } from '@/services/firebase.js'

// Auth Check
export default context => {
  const { store } = context

  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Check Logged
        store.dispatch('loggedUser', user),
        // Load Tasks
        store.dispatch('loadTasks'),
        // Load Tags
        store.dispatch('loadTags')
      }
      return resolve()
    })
  })
}
