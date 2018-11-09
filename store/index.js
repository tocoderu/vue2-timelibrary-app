// Copyright © 2018 Vedegis Evgenii. Contacts: https://github.com/vedees
// License: https://opensource.org/licenses/Apache-2.0

import Vue from 'vue'
import Vuex from 'vuex'

// Common
import common from './common'
import message from './message'
// Private
import user from './private/user'
import time from './private/time'
import tasks from './private/tasks'
import tags from './private/tags'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    common,
    message,
    user,
    time,
    tasks,
    tags
  }
})

export default store