<template lang="pug">
  .content-wrapper
    section
      .container
        .task-list__header
          h1.ui-title-1 Tasks
          .buttons-list
            .button.button--round.button-default(
              @click="filter = 'active'"
            ) Active
            .button.button--round.button-default(
              @click="filter = 'completed'"
            ) Completed
            .button.button--round.button-default(
              @click="filter = 'all'"
            ) All
        .task-list
          transition-group(name="taskList")
            .task-item(
              v-for="task in tasksFilter"
              :key="task.id"
              :class="{ completed: task.completed }"
            )
              .ui-card.ui-card--shadow
                .task-item__info
                  .task-item__main-info
                    span.ui-label.ui-label--light {{ task.whatWatch }}
                    span Total Time: {{ task.time }}
                  span.button-close
                .task-item__content
                  .task-item__header
                    .ui-checkbox-wrapper
                      input.ui-checkbox(
                        type='checkbox'
                        v-model="task.completed"
                      )
                    span.ui-title-3 {{ task.title }}
                  .task-item__body
                    p.ui-text-regular {{ task.description }}
                  .task-item__foter
                    .tag-list
                      .ui-tag__wrapper(
                        v-for="tag in task.tags"
                        :key="tag.title"
                      )
                        .ui-tag
                          span.tag-title {{ tag.title }}
</template>

<script>
export default {
  data () {
    return {
      filter: 'active'
    }
  },
  computed: {
    tasksFilter () {
      if (this.filter === 'active') {
        return this.$store.getters.taskNotCompleted
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.tasks
      }
      return this.filter === 'active'
    }
  }
}
</script>

<style lang="stylus" scoped>
//
// Header buttons list
//
.task-list__header
  display flex
  justify-content space-between
  align-items center
  margin-bottom 30px
  .button
    margin-right 8px
  .ui-title-1
    margin-bottom 0

//
// Task item
//
.task-item
  margin-bottom 20px
  .ui-checkbox:checked:before
    border-color #909399
  &.completed
    .ui-title-3,
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
  .button-close
    width 20px
    height @width
  .ui-label
    margin-right 8px

// Header
.task-item__header
  display flex
  align-items center
  margin-bottom 18px
  .ui-checkbox-wrapper
    margin-right 8px
  .ui-title-3
    margin-bottom 0

// Body
.task-item__body
  margin-bottom 20px

// Footer
.task-item__footer
  .ui-tag
    margin-right 16px
</style>
