<template lang="pug">
.kanban-task__item
  | {{task.text}}
</template>

<script>
export default {
  name: 'KanbanColumnTask',
  props: {
    task: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
