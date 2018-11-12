<template lang="pug">
.ui-tag__wrapper
  .ui-tag(:class="{used: tag.use}")
    span.tag-title(
      @click="$emit('add', tag)"
    ) {{ tag.title }}
    span.button-close(@click="$emit('delete', tag.id)")

</template>

<script>
export default {
  name: 'Tag',
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.ui-tag__wrapper
  margin-right 18px
  margin-bottom 10px
  &:last-child
    margin-right 0

.tag-title
  cursor: pointer

.ui-tag
  // Tag Touch
  &.used
    background-color: #444ce0
    color #fff
    .button-close
      &:before,
      &:after
        background-color: #fff
  .button-close
    //* Menu
    &.active
      transform: rotate(45deg)
</style>
