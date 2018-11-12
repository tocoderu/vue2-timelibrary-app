<template lang="pug">
  .wrapper(:class="{blur: loading}")
    // Header + Navbar
    Header

    // Render
    nuxt

    // Preloader
    no-ssr
      .preloader__wrapper(v-if="loading")
        .preloader1
        .preloader2
        .preloader3

    // Error & Success Messages
    no-ssr
      Message

</template>

<script>
import Header from '@/components/System/Header.vue'
import Message from '@/components/UI/Message.vue'
export default {
  components: {
    Header, Message
  },
  computed: {
    // Show loading status
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="stylus">
</style>
