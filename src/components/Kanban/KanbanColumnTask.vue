<template lang="pug">
.card(:class="{'card--expired':isExpired}")
  .card__bar.card__bar--notice(v-if="hasNotice")
    .expired-less-then-day(v-if="isLessThanDayExpire") Expire less then day
  .card__container
    .card__title {{task.title}}
    .card__body
      | {{task.text}}
      .card__time
        span.card__time-title Deadline:
          time
            | {{taskDate}}
  .card__bar.card__bar--statuses
    app-card-status-icon(:status="task.status")
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ETaskStatus, ITask } from '@/types/task'
import AppCardStatusIcon from '@/components/Kanban/ui/AppCardStatusIcon.vue'
export default defineComponent({
  name: 'KanbanColumnTask',
  components: { AppCardStatusIcon },
  props: {
    task: {
      required: true,
      type: Object as PropType<ITask>
    }
  },
  setup (props) {
    const taskDate = computed(() => new Date(props.task.date).toLocaleDateString())
    const isDone = computed(() => props.task.status === ETaskStatus.done)
    const isInProgress = computed(() => props.task.status === ETaskStatus.inprogresss)
    const isExpired = computed(() => +new Date() > +new Date(props.task.date) && !isDone.value)
    const isLessThanDayExpire = computed(() => (+new Date(props.task.date) - +new Date()) < (24 * 60 * 60 * 1000) && !isExpired.value && !isDone.value)
    const hasNotice = computed(() => isLessThanDayExpire.value)
    return { taskDate, isExpired, isDone, isInProgress, isLessThanDayExpire, hasNotice }
  }

})
</script>

<style lang="scss" scoped>
.card {
  &__bar {
    display: flex;
    &--notice {
      justify-content: end;
    }
    &--statuses {
      justify-content: end;
    }
  }
  &--expired{
    box-shadow: #dc3545 0px 4px 8px -2px, #ff0000 0px 0px 0px 1px;
    time{
      font-weight: bold;
      color: red;
    }
  }
  &__title {
    font-size: 1.1em;
    font-weight: bold;
    padding: 10px;
  }
  &__time {
    display: flex;
    justify-content: end;
    padding: 10px 0;
    font-width: bold;
    &-title {
      font-size: 0.9em;
    }
    time {
      padding: 0 10px;
      font-size: 0.8em;
    }
  }
  .expired-less-then-day{
    font-weight: bold;
    color: orange;
  }
}
</style>
