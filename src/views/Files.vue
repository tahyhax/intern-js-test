<template lang="pug">
.files
  .files__header
    h3 Activity Files
  .files__list
    .files__item(  v-for="attachment in attachments")
      img(:src="attachment.src" :alt="attachment.title")

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'files',
  setup: function () {
    const store = useStore()
    const attachments = computed(() => store.getters['activity/getAllAttachments'])
    return {
      attachments
    }
  }
})
</script>

<style lang="scss" scoped>
.files {
  padding: 15px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (min-width: 768px) {
    max-width: 730px;
    border-radius: 8px 8px 0 0;
    padding: 35px 30px 0 35px;
  }

  &__header{
    margin-bottom: 15px;
    > h3 {
      text-transform: uppercase;
      opacity: 0.5;
      font-size: 14px;
      color: #131313;
    }
  }
  &__list {
    display: flex;
    margin: 0 -5px;
    flex-wrap: wrap;

  }
  &__item {
    margin-bottom: 5px;
    padding: 0 5px;
  }
}
</style>
