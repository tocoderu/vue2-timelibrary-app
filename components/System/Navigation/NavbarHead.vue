<template lang="pug">
  .navbar
    .container
      .navbar-content
        nuxt-link.header-logo(
          to="/"
        ) {{ site }}
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
              @click="menuShow = false")
              // TODO fix props
              nuxt-link.navbar-link(
                v-if="checkUser"
                :to="link.url + IdUser"
              ) {{ link.title}}
              nuxt-link.navbar-link(
                v-else
                :to="link.url"
              ) {{ link.title}}

            // SSR
            no-ssr
              li.navbar-item(
                v-if="checkUser"
                @click="logout")
                span.navbar-link Logout
</template>

<script>
export default {
  name: 'NavbarHead',
  props: {
    site: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      menuShow: false
    }
  },
  computed: {
    checkUser () {
      return this.$store.getters.checkUser
    },
    IdUser () {
      return this.$store.getters.user.id
    },
    links () {
      if (this.checkUser) {
        return [
          {title: 'Home', url: '/'},
          {title: 'Library', url: "/library/"}
        ]
      }
      return [
        {title: 'Login', url: '/login/'},
        {title: 'Registration', url: '/registration/'}
      ]
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  },
}
</script>
