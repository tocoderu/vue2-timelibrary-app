<template lang="pug">
  //- Copyright © 2018 Vedegis Evgenii. Contacts: https://github.com/vedees
  //- License: https://opensource.org/licenses/Apache-2.0

  .wrapper(:class="{blur: loading}")
    // Header + Navbar
    Header

    // Render
    nuxt

    // Preloader
    .preloader__wrapper(v-if="loading")
      .preloader1
      .preloader2
      .preloader3

    // Error & Success Messages
    .ui-message(
      v-if="messageShow"
      :class="[{ 'ui-message--success': messageContext === 'success' }, { 'ui-message--danger': messageContext === 'error' }]")
      span.message-title {{ messageTitle }}

</template>

<script>
import Header from '@/components/System/Header.vue'
export default {
  components: {
    Header
  },
  computed: {
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
  },
}
</script>

<style lang="stylus">
</style>
