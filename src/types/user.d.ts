import { ITask } from '@/types/task'

export interface IUser {
    lastname: string,
    firstname: string,
    position: string,
    logo: ?string,
    notifications: number,
    tasks: ITask
}
