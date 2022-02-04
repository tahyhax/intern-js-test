<template lang="pug">
app-modal(
  v-if="isActiveForm"
  :isActive="!!taskToShow"
  @onClose="handlerCloseForm"
)
  template(#header)
    | {{ taskToShow.title }}
  template(#body)
    calendar-task-detail(:card="taskToShow" :isReadOnly="true")
.calendar
  v-calendar(
    class="custom-calendar"
    :masks="calendarMasks"
    :attributes="tasks"
    disable-page-swipe
    is-expanded
  )
    template(v-slot:day-content="{ day, attributes }")
      .calendar__day
        .calendar__day-date {{ day.day }}
        .calendar__event-container
          p( v-for="attr in attributes"
            :key="attr.key"
            class="calendar__event-title"
            :class="attr.customData.class"
            @click="handlerTaskPreview(attr.customData._id)"
        ) {{ attr.customData.title }}
</template>

<script>
import { defineComponent } from 'vue'
import { Calendar } from 'v-calendar'
import AppModal from '../components/ui/AppModal'
import CalendarTaskDetail from '../components/Calendar/CalendarTaskDetail'
import useCalendar from '../composables/useCalendar'
import useTask from '../composables/useTask'
import useModal from '../composables/useModal'

export default defineComponent({
  components: { 'v-calendar': Calendar, AppModal, CalendarTaskDetail },
  setup: function () {
    const calendarMasks = {
      weekdays: 'WWW'
    }
    const { tasks: tasksList, taskToShow, handlerTaskDetail } = useTask()
    const { tasks } = useCalendar(tasksList)
    const { isActiveForm, handlerOpenForm, handlerCloseForm } = useModal()
    const handlerTaskPreview = (id) => {
      handlerTaskDetail(id)
      handlerOpenForm()
    }
    return { calendarMasks, tasks, taskToShow, isActiveForm, handlerTaskPreview, handlerCloseForm }
  }
})
</script>

<style lang="scss" scoped>
.calendar {
  padding: 0 0.8rem 0.8rem;
  width: 100%;

  &__day {
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 5px;
  }

  &__day-date {
    display: flex;
    flex: 0 0 auto;
    font-size: 12px;
    font-weight: bold;
    width: 25px;
    height: 25px;
    background-color: #ffc200;
    color: #131313;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
  }

  &__event-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
    height: calc(var(--day-height) - 10px);
    flex: auto;
    margin-left: 10px;
  }

  &__event-title {
    margin: 0 0 5px 0;
    padding: 5px;
    border-radius: 5px;
    font-size: 0.8em;
    cursor: pointer;
    transition: font .3s ease-out;

    &:hover {
      font-weight: bold;
    }

    &--todo {
      background-color: gray;
    }

    &--in-progress {
      background-color: #efc74e;
    }

    &--done {
      background-color: #008000;
    }
  }
}

div::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 120px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;

  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }

  & .vc-weeks {
    padding: 0;
  }

  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }

  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;

    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }

    &:not(.on-bottom) {
      border-bottom: var(--day-border);

      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }

    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }

  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
