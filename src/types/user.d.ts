import { ITask } from '@/types/task'

export interface IUser {
    lastname: number,
    firstname: string,
    position: string,
    logo: ?string,
    notifications: number,
    tasks: ITask
}
