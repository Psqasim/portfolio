import { type SchemaTypeDefinition } from 'sanity'
import contact from './contact'
import project from './project'
import profile from './profile'
import skill from './skill'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contact,project,profile,skill],
}
