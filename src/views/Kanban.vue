<template lang="pug">
section.kanban
  app-modal(
    v-if="isActiveForm"
    :isActive="!!taskToShow"
    @onClose="handlerCloseForm"
  )
    template(#header)
      | {{ taskToShow.title }}
    template(#body)
      app-task-card-detail(:task="taskToShow" @onSubmit="handlerFormSubmit")
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
        @onTaskDetail="handlerTaskPreview"
        )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KanbanColumn from '@/components/Kanban/KanbanColumn.vue'
import AppModal from '@/components/ui/AppModal.vue'
import DateRange from '@/components/Form/fitlers/DateRange.vue'
import useKanban from '@/composables/useKanban'
import useTask from '@/composables/useTask'
import AppTaskCardDetail from '@/components/ui/AppTaskCardDetail.vue'
import useModal from '@/composables/useModal'
import { ITask } from '@/types/task'

export default defineComponent({
  name: 'kanban',
  components: {
    AppTaskCardDetail,
    AppModal,
    KanbanColumn,
    DateRange
  },
  setup: function () {
    // TODO create  component search  and useSearch
    const { kanbanList, searchString, dateRange, handlerDrugTask } = useKanban()
    const { taskToShow, handlerTaskDetail, handlerTaskSave } = useTask()
    const { isActiveForm, handlerOpenForm, handlerCloseForm } = useModal()

    const handlerFormSubmit = (task:ITask) => {
      handlerTaskSave(task)
      handlerCloseForm()
    }

    const handlerTaskPreview = (id) => {
      handlerTaskDetail(id)
      handlerOpenForm()
    }
    return {
      taskToShow,
      searchString,
      dateRange,
      kanbanList,
      isActiveForm,
      handlerFormSubmit,
      handlerTaskPreview,
      handlerCloseForm,
      handlerDrugTask,
      handlerTaskSave,
      handlerOpenForm
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
