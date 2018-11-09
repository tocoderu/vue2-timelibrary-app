<template lang="pug">
  transition(
    enter-active-class="animated fadeInDown"
    leave-active-class="animated fadeOutUp"
  )
    .ui-message(
      v-if="messageShow"
      :class="[{ 'ui-message--success': messageContext === 'success' }, { 'ui-message--danger': messageContext === 'error' }]")
      .body
        span.message-title {{ messageTitle }}
        span.button-close(@click="messageClose")

</template>

<script>
export default {
  name: 'Message',
  computed: {
    // Getters
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
  methods: {
    messageClose () {
      this.$store.commit('unsetMessage')
    }
  }
}
</script>

<style lang="stylus" scoped>
.body
  display flex
  justify-content space-between
  align-items center

.message-title
  margin-right 8px

.button-close
  opacity .9
  width 14px
  height @width
  &:before,
  &:after
    // TODO FIX background-color
    background #fff
</style>
