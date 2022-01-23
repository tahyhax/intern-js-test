import { ITask } from '@/types/task'

export default function useCalendar (tasksList) {
  const tasks = tasksList.map((task: ITask, key) => {
    return {
      key: key,
      customData: {
        title: task.title,
        class: `calendar__event-title--${task.status}`
      },
      dates: new Date(task.date)
    }
    return {
      _id: task._id,
      title: task.title,
      dates: new Date(task.date),
      class: `calendar__event-title--${task.status}`
    }
  })

  return { tasks }
}
