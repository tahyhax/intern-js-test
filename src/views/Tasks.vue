<template lang="pug">
.task
  header.task__header
    h3 Today
  .task__body
    task-form(@onSubmit="addTask")
    .task__list
      task-item(v-for="(task, key) in tasks"
        :task="task"
        :index="key"
        :key="`task-${key}`"
        @onCompleteTask="completeTask"
        @onDestroyTask="destroyTask"
      )
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ITask, ETaskStatus } from '@/types/task'
import TaskForm from '@/components/Task/TaskFrom.vue'
import TaskItem from '@/components/Task/TaskItem.vue'
import { uuid } from '@/utils'

export default defineComponent({
  name: 'Tasks',
  components: {
    TaskForm,
    TaskItem
  },
  data () {
    return {
      tasks: [] as Array<ITask>
    }
  },
  created () {
    this.tasks = [
      { _id: uuid(), title: 'task 1', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', status: ETaskStatus.todo, date: '2021-12-09 14:23' },
      { _id: uuid(), title: 'task 2', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', status: ETaskStatus.todo, date: '2021-12-09 14:24' },
      { _id: uuid(), title: 'task 3', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged', status: ETaskStatus.todo, date: '2021-12-09 14:26' }
    ]
  },
  methods: {
    addTask (task: ITask): void {
      this.tasks.push(task)
    },
    destroyTask (index: number): void {
      this.tasks.splice(index, 1)
    },
    completeTask (index: number) {
      this.tasks[index].status = ETaskStatus.done
    }
  }
})
</script>
<style lang="scss" itemscope>
.task {
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

  &__header {
    text-transform: uppercase;
    opacity: 0.5;
    font-size: 14px;
    color: #131313;
    margin-bottom: 2px;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }
}
</style>
