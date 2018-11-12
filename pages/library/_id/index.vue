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
              @delete="deleteTask(task.id, task.title)"
            )

    EditModal(
      v-if="editingPopup"
      :id="taskId"
      :title="titleEditing"
      :description="desrEditing"
      @cancel="cancelTaskEdit"
      @finish="finishTaskEdit"
    )

    DeleteModal(
      v-if="deletePopup"
      :id="taskId"
      :title="titleEditing"
      @cancel="cancelDelete"
      @delete="deleteSure"
    )

</template>

<script>
import TaskItem from '@/components/Library/TaskItem.vue'
import EditModal from '@/components/Library/EditModal.vue'
import DeleteModal from '@/components/Library/DeleteModal.vue'
export default {
  components: {
    TaskItem,
    EditModal,
    DeleteModal
  },
  data () {
    return {
      filter: 'active',
      // Editing
      editingPopup: false,
      // Delete
      deletePopup: false,
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
    // EDITING
    taskEdit (id, title, description) {
      this.taskId = id
      this.titleEditing = title
      this.desrEditing = description
      // Menu
      this.editingPopup = !this.editingPopup
    },
    cancelTaskEdit () {
      this.taskId = null
      this.titleEditing = ''
      this.desrEditing = ''
      // Menu
      this.editingPopup = !this.editingPopup
    },
    finishTaskEdit (obj) {
      let id = obj.idE
      let title = obj.titleE
      let description = obj.descrE
      this.$store.dispatch('editTask', {
        id,
        title,
        description,
      })
        // Close modal
        .then(() => {
          this.editingPopup = !this.editingPopup
        })
    },

    // DELETE
    deleteTask (id, title) {
      this.deletePopup = !this.deletePopup
      this.taskId = id
      this.titleEditing = title
    },
    cancelDelete () {
      this.deletePopup = !this.deletePopup

      // Reset
      this.taskId = null
      this.titleEditing = ''
      this.desrEditing = ''
    },
    deleteSure (id) {
      this.$store.dispatch('deleteTask', id)
        .then(() => {
          this.$store.dispatch('loadTasks')
            .then(() => {
              this.deletePopup = !this.deletePopup
            })
        })
    },
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
