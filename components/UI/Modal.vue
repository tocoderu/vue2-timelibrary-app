<template lang="pug">
.ui-messageBox__wrapper(
  v-if="editingPopup"
  @click="cancelTaskEdit"
  :class="{active: editingPopup}"
)
  .ui-messageBox.fadeInDown(
    @click.stop=""
  )
    .ui-messageBox__header
      span.messageBox-title {{ title }}
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
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
