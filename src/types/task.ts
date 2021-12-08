export enum ETaskStatus {
    todo = 'todo',
    inprogresss = 'in-progress',
    done = 'done'
}
export interface ITask {
    title: string,
    text: string,
    date: string,
    status: ETaskStatus
}
