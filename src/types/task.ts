export enum ETaskStatus {
    todo = 'todo',
    inprogresss = 'in-progress',
    done = 'done'
}

export interface ITask {
    _id: string,
    title: string,
    text: string,
    date: string,
    status: ETaskStatus
}
