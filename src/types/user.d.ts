
interface IUserTask {
    open: number,
    complete: number
}

export interface IUser {
    lastname: string,
    firstname: string,
    position: string,
    logo?: string,
    notifications: number,
    task: IUserTask
}
