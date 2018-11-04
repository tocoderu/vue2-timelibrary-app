import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import message from './message'
import user from './user'
import tasks from './tasks'
import tags from './tags'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    message,
    user,
    tasks,
    tags
  }
})
