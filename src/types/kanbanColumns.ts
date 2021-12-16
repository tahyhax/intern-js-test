import { ETaskStatus, ITask } from '@/types/task'

export interface IKanbanColumns {
    name: string,
    type: ETaskStatus,
    tasks?: ITask[]
}
