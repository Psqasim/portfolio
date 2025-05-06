import { type SchemaTypeDefinition } from 'sanity'
import contact from './contact'
import project from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contact,project],
}
