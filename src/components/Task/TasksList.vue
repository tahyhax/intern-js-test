<template lang="pug">
.task__message(v-for="(task, key) in tasks"
  :key="key")
  .task__message-icon(:class="'task__message-icon--' + task.type")
    img(src="@/assets/Icon@3x.svg")
  .task__message-body
  .task__message-content
  .task__message-text
    p {{ task.text }}
  .task__message-time {{ task.created }}
</template>

<script>
// import { PropType } from 'vue'
// import { ITasks } from '@/types/tasks'

export default {
  name: 'TasksList',
  props: {
    tasks: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
