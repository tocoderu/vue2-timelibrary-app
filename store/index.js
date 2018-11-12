/*!
 * TimeLibrary v1.0.4 - web application
 * https://github.com/vedees/timelibrary
 * Copyright (C) 2018 Vedegis Evgenii <vedegis@gmail.com>
 * @license GPL-3.0
 * https://github.com/vedees/timelibrary/master/LICENSE
 */

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