<template lang="pug">
  Modal(
    :title="title"
    @click="$emit('cancel')"
    @cancel="$emit('cancel')"
  )
    .ui-messageBox__content(slot="content")
      p Delete - {{ title }}
      p Are you sure?
    .ui-messageBox__footer(slot="footer")
      .button.button-light(@click="$emit('cancel')") Cancel
      .button.button-primary(@click="$emit('delete', id)") Delete
      //- .button.button-primary(@click="$emit('finish', {idE, titleE, descrE})") OK

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
    }
  }
}
</script>
