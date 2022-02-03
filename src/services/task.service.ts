import { ApiService } from '@/services/api.service'
import { ETaskStatus, ITask } from '@/types/task'

const TaskService = {
  get: () => ApiService.get('/tasks'),
  getById: (id: string) => ApiService.get(`/task/${id}`),
  add: (task: ITask) => ApiService.post('/task', task),
  update: (id: string, task: ITask) => ApiService.put(`/task/${id}/update`, { task }),
  delete: (id: string) => ApiService.delete(`/task/${id}`),
  updateStatus: (id: string, status: ETaskStatus) => ApiService.put(`/task/${id}/update-status`, { status: status })
}
export default TaskService
