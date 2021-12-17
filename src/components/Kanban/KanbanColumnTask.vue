<template lang="pug">
.kanban-task__item
  | {{task.text}}
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ITask } from '@/types/task'
export default defineComponent({
  name: 'KanbanColumnTask',
  props: {
    task: {
      required: true,
      type: Object as PropType<ITask>
    }
  }
})
</script>

<style scoped>

</style>
