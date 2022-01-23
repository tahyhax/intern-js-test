export enum EActivity {
  answer = 'answer',
  message = 'message',
  complete = 'complete',
  attachment = 'attachment'
}

export interface IAttachment {
  _id: string,
  src: string,
  description: string
}

export interface IActivity {
  _id: string,
  text: string,
  type: EActivity,
  created: string,
  attachments?: IAttachment[]
}
