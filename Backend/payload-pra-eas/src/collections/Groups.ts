import { CollectionConfig } from 'payload/types'
import { authenticatedUser } from '../access/authenticatedUser'
import { authorOrAdmin } from '../access/authorOrAdmin'

const Groups: CollectionConfig = {
  slug: 'groups',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'groupName',
      type: 'text',
      required: true
    },
  ]
}

export default Groups
