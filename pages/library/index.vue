<template lang="pug">
  .content-wrapper
    section
      .container
        .task-list__header
          h1.ui-title-1 Library

          // Filter
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

        // Tasl load
        .task-list
          transition-group(name="taskList")
            TaskItem(v-for="task in tasksFilter"
              :key="task.id"
              :task="task"
              @completed="taskCompleted(task.id, task.completed)"
              @edit="taskEdit(task.id, task.title, task.description)"
              @delete="deleteTask(task.id)"
            )


    .ui-messageBox__wrapper(
      v-if="editingPopup"
      @click="cancelTaskEdit"
      :class="{active: editingPopup}"
    )
      .ui-messageBox.fadeInDown(
        @click.stop=""
      )
        .ui-messageBox__header
          span.messageBox-title {{ titleEditing }}
          span.button-close(@click="cancelTaskEdit")
        .ui-messageBox__content
          p Title
          input(
            type="text"
            v-model='titleEditing'
            @keyup.esc="cancelTaskEdit"
          )
          p Description
          textarea(
            type="text"
            v-model='desrEditing'
            @keyup.esc="cancelTaskEdit"
          )
        .ui-messageBox__footer
          .button.button-light(@click="cancelTaskEdit") Cancel
          .button.button-primary(@click="finishTaskEdit") OK

</template>

<script>
import TaskItem from '@/components/TaskItem.vue'
export default {
  components: {
    TaskItem
  },
  data () {
    return {
      filter: 'active',
      // Editing
      editingPopup: false,
      titleEditing: '',
      desrEditing: '',
      taskId: null
    }
  },
  computed: {
    // Filter buttons
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
  },
  methods: {
    // Completed
    taskCompleted (id, completed) {
      completed ? completed = false : completed = true

      this.$store.dispatch('completedTask', {
        id,
        completed
      })
        .then(() => {
          console.log(completed)
          // this.$store.dispatch('loadTasks')
        })
    },
    // Edit
    taskEdit (id, title, description) {
      this.editingPopup = !this.editingPopup
      // console.log({id, title, description})
      this.taskId = id
      this.titleEditing = title
      this.desrEditing = description
    },

    // Cancel button (POPUP)
    cancelTaskEdit () {
      this.editingPopup = !this.editingPopup

      // Reset
      this.taskId = null
      this.titleEditing = ''
      this.desrEditing = ''
    },

    // Done button
    finishTaskEdit () {
      // console.log(this.titleEditing)
      this.$store.dispatch('editTask', {
        id: this.taskId,
        title: this.titleEditing,
        description: this.desrEditing
      })
      this.editingPopup = !this.editingPopup
    },

    // Delete button
    deleteTask (id) {
      console.log('task deleted test ')
      this.$store.dispatch('deleteTask', id)
        .then(() => {
          console.log('task deleted')
          this.$store.dispatch('loadTasks')
        })
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
  flex-wrap: wrap
  margin-bottom 30px
.ui-title-1
  margin-bottom 0
  @media screen and (max-width: 768px)
    margin-bottom 20px

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
