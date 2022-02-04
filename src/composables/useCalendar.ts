import { ITask } from '@/types/task'
import { computed } from 'vue'

export default function useCalendar (tasksList) {
  const tasks = computed(() => tasksList.value.map((task: ITask, key) => {
    return {
      key: key,
      customData: {
        _id: task._id,
        title: task.title,
        date: task.createdAt,
        class: `calendar__event-title--${task.status}`
      },
      dates: new Date(task.createdAt)
    }
  }))

  return { tasks }
}
