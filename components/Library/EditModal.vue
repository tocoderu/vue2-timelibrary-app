<template lang="pug">
  Modal(
    :title="title"
    @click="$emit('cancel')"
    @cancel="$emit('cancel')"
  )
    .ui-messageBox__content(slot="content")
      p Title
      input(
        type="text"
        v-model='titleE'
      )
      p Description
      textarea(
        type="text"
        v-model='descrE'
      )
    .ui-messageBox__footer(slot="footer")
      .button.button-light(@click="$emit('cancel')") Cancel
      // New field
      // TODO func
      .button.button-primary(@click="$emit('finish', {idE, titleE, descrE})") OK

</template>

<script>
import Modal from '@/components/UI/Modal.vue'
export default {
  components: {
    Modal
  },
  props: {
    // TODO obj
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      idE: this.id,
      titleE: this.title,
      descrE: this.description
    }
  }
}
</script>
