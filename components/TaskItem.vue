<template lang="pug">
.task-item(:class="{ completed: task.completed }")
  .ui-card.ui-card--shadow
    .task-item__info
      .task-item__main-info
        span.ui-label(
          :class="[{ 'ui-label--primary': !task.completed }, { 'ui-label--light': task.completed  }]"
        ) {{ task.whatWatch }}
        span Total Time: {{ task.time }}
      span.button-close(
        @click="$emit('delete')"
      )
    .task-item__content
      .task-item__header
        .ui-checkbox-wrapper
          input.ui-checkbox(
            type="checkbox"
            v-model="task.completed"
            @click="$emit('completed')"
          )
        span.ui-title-2 {{ task.title }}
      .task-item__body
        p.ui-text-regular {{ task.description }}
      .task-item__foter

        // Tags load
        .tag-list
          .ui-tag__wrapper(
            v-for="tag in task.tags"
            :key="tag.title"
          )
            .ui-tag
              span.tag-title {{ tag.title }}

        // Buttons
        .buttons-list
          .button.button--round.button-default(
            @click="$emit('edit')"
          ) Edit
          .button.button--round(
            :class="[{ 'button-primary': !task.completed }, { 'button-light': task.completed  }]"
            @click="$emit('completed')"
          )
            span(v-if="task.completed") Return
            span(v-else) Done

</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
}
</script>

<style lang="stylus" scoped>
// Item
.task-item
  margin-bottom 20px
  .ui-checkbox:checked:before
    border-color #909399
  &.completed
    .ui-title-2,
    .ui-text-regular,
    .ui-tag
      text-decoration line-through
      color #909399
  &:last-child
    margin-bottom 0

.ui-tag__wrapper
  margin-right 16px

// Info
.task-item__info
  display flex
  align-items center
  justify-content space-between
  margin-bottom 20px
  @media screen and (max-width: 768px)
    align-items flex-start

  .button-close
    width 20px
    height @width
  .ui-label
    margin-right 8px

.task-item__main-info
  @media screen and (max-width: 768px)
    display flex
    align-items: flex-start
    flex-direction column

// Header
.task-item__header
  display flex
  align-items center
  margin-bottom 18px
  .ui-checkbox-wrapper
    margin-right 8px
  .ui-title-2
    margin-bottom 6px

// Body
.task-item__body
  margin-bottom 20px

// Footer
.tag-list
  margin-bottom 20px

.task-item__foter
  .buttons-list
    text-align right

// ALL buttons
.buttons-list
  .button
    margin-right 12px
    &:last-child
      margin-right 0

// POPUP
.ui-messageBox__wrapper
  &.active
    display flex
  .button-light
    margin-right 8px
</style>
