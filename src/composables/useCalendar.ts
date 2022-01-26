import { ITask } from '@/types/task'

export default function useCalendar (tasksList) {
  const tasks = tasksList.map((task: ITask, key) => {
    return {
      key: key,
      customData: {
        _id: task._id,
        title: task.title,
        class: `calendar__event-title--${task.status}`
      },
      dates: new Date(task.date)
    }
  })

  return { tasks }
}
