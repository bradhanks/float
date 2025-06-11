export function HelloWorldAction(props) {
  return {
    label: 'Hello world',
    onHandle: () => {
      // Here you can perform your actions
      window.alert('👋 Hello from custom action')
    },
  }
}

// import {createAction} from '@sanity/actions'

// const createResult = await createAction('sanity.action.document.create', {
//   dataset: 'production',
//   document: {
//     _type: 'post',
//     title: 'New Post',
//     slug: {
//       _type: 'slug',
//       current: 'new-post'
//     }
// //   }
// // })
// 2. Edit a Document
// javascript
// await createAction('sanity.action.document.edit', {
//   dataset: 'production',
//   id: 'document-id-here',
//   patch: {
//     set: {
//       title: 'Updated Title'
//     },
//     unset: ['oldField']
//   }
// })
// 3. Publish/Unpublish
// javascript
// // Publish
// await createAction('sanity.action.document.publish', {
//   dataset: 'production',
//   id: 'document-id-here'
// })

// // Unpublish
// await createAction('sanity.action.document.unpublish', {
//   dataset: 'production',
//   id: 'document-id-here'
// })
// 4. Delete a Document
// javascript
// await createAction('sanity.action.document.delete', {
//   dataset: 'production',
//   id: 'document-id-here'
// })
