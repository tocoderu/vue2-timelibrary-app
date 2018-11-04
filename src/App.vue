<template lang="pug">
  .wrapper
    header
      .navbar
        .container
          .navbar-content
            router-link.header-logo(
              to="/"
            ) Time Library
            .button-burger(
              @click="menuShow = !menuShow"
              :class="{ active: menuShow }"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3
            .navbar-list__wrapper(
              :class="{ active: menuShow }"
            )
              ul.navbar-list
                li.navbar-item(
                  v-for="link in links"
                  :key="link.title"
                  @click="menuShow = false"
                )
                  router-link.navbar-link(
                    :to="`${link.url}`"
                  ) {{ link.title }}
                li.navbar-item(
                  v-if="checkUser"
                  @click="logout"
                )
                  span.navbar-link Logout

    router-view(:class="{blur: loading}")

    .preloader__wrapper(v-if="loading")
      .preloader1
      .preloader2
      .preloader3

    .ui-message(
      v-if="messageShow"
      :class="[{ 'ui-message--success': messageContext === 'success' }, { 'ui-message--danger': messageContext === 'error' }]")
      span.message-title {{ messageTitle }}

</template>

<script>
export default {
  data () {
    return {
      menuShow: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  },
  computed: {
    checkUser () {
      return this.$store.getters.checkUser
    },
    links () {
      if (this.checkUser) {
        return [
          {title: 'Home', url: '/'},
          {title: 'Library', url: '/library'}
        ]
      }
      return [
        {title: 'Login', url: '/login'},
        {title: 'Registration', url: '/registration'}
      ]
    },
    // Show loading status
    loading () {
      return this.$store.getters.loading
    },
    messageShow () {
      return this.$store.getters.message.show
    },
    messageTitle () {
      return this.$store.getters.message.title
    },
    messageContext () {
      return this.$store.getters.message.context
    }
  }
}
</script>

<style lang="stylus">
@import './assets/stylus/main.styl'
</style>
