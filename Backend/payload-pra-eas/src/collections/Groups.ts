import { CollectionConfig } from 'payload/types'
import { authenticatedUser } from '../access/authenticatedUser'
import { authorOrAdmin } from '../access/authorOrAdmin'

const Groups: CollectionConfig = {
  slug: 'groups',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    create: authenticatedUser,
    read: authenticatedUser,
    update: authenticatedUser,
    delete: authorOrAdmin,
  },
  fields: [
    {
      name: 'groupName',
      type: 'text',
      required: true
    },
    {
      name: 'members',
      type: 'array',
      fields: [
        {
          name: 'memberID',
          type: 'relationship',
          relationTo: 'accounts',
        }
      ],
      required: true
    },
    {
      name: 'messages',
      type: 'array',
      fields: [
        {
          name: 'message',
          type: 'group',
          fields: [
            {
              name: 'sender',
              type: 'relationship',
              relationTo: 'accounts',
              required: true
            },
            {
              name: 'content',
              type: 'textarea',
              required: true
            },
            {
              name: 'timestamp',
              type: 'date',
              required: true
            }
          ]
        }
      ],
    }
  ]
}

export default Groups
