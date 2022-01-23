import { IActivity } from '@/types/activity'
import { uuid } from '@/utils'

const store = {
  namespaced: true,
  state: {
    activities: [
      {
        _id: uuid(),
        text: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
        type: 'complete',
        created: '8:40 PM'
      },
      {
        _id: uuid(),
        text: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
        type: 'message',
        created: '7:32 PM'
      },
      {
        _id: uuid(),
        text: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
        type: 'answer',
        created: ''
      },
      {
        _id: uuid(),
        text: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
        type: 'attachment',
        created: '6:02 PM',
        attachments: [
          {
            _id: uuid(),
            src: 'https://via.placeholder.com/100?text=Image 1',
            description: 'Image 1'
          },
          {
            _id: uuid(),
            src: 'https://via.placeholder.com/100?text=Image 2',
            description: 'Image 2'
          },
          {
            _id: uuid(),
            src: 'https://via.placeholder.com/100?text=Image 3',
            description: 'Image 3'
          },
          {
            _id: uuid(),
            src: 'https://via.placeholder.com/100?text=Image 4',
            description: 'Image 4'
          }
        ]
      }] as IActivity[]
  }
}

export default store
