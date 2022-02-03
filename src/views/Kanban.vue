<template lang="pug">
section.kanban
  app-modal(
    v-if="isTaskShow"
    :isActive="isTaskShow"
    @onClose="handlerOnCLose"
  )
    template(#header)
      | {{ taskToShow.title }}
    template(#body)
      kanban-card-detail(:card="taskToShow" @onSubmit="handlerTaskUpdate")
  .kanban__container
    .kanban__filters.filters
      .filters__item
        input.filters__input.filters__input--search(v-model="searchString" placeholder="Search by title")
      .filters__item
        date-range(
          name="date"
          v-model="dateRange"
        )
    .kanban__board
      kanban-column(
        v-for="(column, key) in kanbanList"
        @onDrugTask="handlerDrugTask"
        :column="column"
        :key="`kanban-${key}`"
        @onTaskDetail="handlerTaskDetail"
        )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KanbanColumn from '@/components/Kanban/KanbanColumn.vue'
import AppModal from '@/components/ui/AppModal.vue'
import KanbanCardDetail from '@/components/Kanban/KanbanCardDetail.vue'
import DateRange from '@/components/Form/fitlers/DateRange.vue'
import useKanban from '@/composables/useKanban'
import useTask from '@/composables/useTask'

export default defineComponent({
  name: 'kanban',
  components: {
    AppModal,
    KanbanCardDetail,
    KanbanColumn,
    DateRange
  },
  setup: function () {
    // TODO create  component search  and useSearch
    const { kanbanList, searchString, dateRange, handlerDrugTask } = useKanban()
    const { taskToShow, isTaskShow, handlerTaskDetail, handlerOnCLose, handlerTaskUpdate } = useTask()

    return {
      isTaskShow,
      taskToShow,
      searchString,
      dateRange,
      kanbanList,
      handlerTaskDetail,
      handlerOnCLose,
      handlerDrugTask,
      handlerTaskUpdate
    }
  }
})
</script>

<style lang="scss" itemscope>
.kanban {
  width: 100%;

  &__container {
    padding: 0 0.8rem 0.8rem;
  }

  &__filters {
    display: flex;
    padding: 15px 0;
    margin-bottom: 10px;
    background-color: #ffffff;
  }

  &__board {
    display: flex;
    align-items: flex-start;
  }

  &__column {
    display: flex;
    flex-direction: column;
    background-color: #e2e4e6;
    max-height: calc(100vh - 11.8rem);
    border-radius: 0.3rem;
    margin-right: 1rem;
    max-width: calc(100% / 3);
    min-width: calc(100% / 3 - 1rem);

    &:last-of-type {
      margin-right: 0;
    }
  }

  &__title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #333;
    padding: 1rem;
  }

  .filters {
    display: flex;

    &__item {
      padding: 0 10px;
    }

    &__input {
      padding: 10px;
      background: #eaeaea;
      border-radius: 10px;
      outline: none;
      max-width: 100%;

      &--serach {
      }
    }
  }
}
</style>
