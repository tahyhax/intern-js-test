import { ETaskStatus, ITask } from '@/types/task'

export interface IKanban {
    name: string,
    type: ETaskStatus,
    tasks: Array<ITask>
}
