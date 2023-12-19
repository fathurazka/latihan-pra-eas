import { CollectionConfig } from 'payload/types'

const PrivateChats: CollectionConfig = {
  slug: 'privatechats',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
        name: 'senderID',
        type: 'text',
        required: true,
        defaultValue: ({ user }) => user.id,
    },
    {
        name: 'receiverID',
        type: 'text',
        required: true,
    },
    {
        name: 'content',
        type: 'textarea',
        required: true,
    }
  ]
}

export default PrivateChats
