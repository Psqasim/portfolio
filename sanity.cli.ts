import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const studioHost = 'psqasim'

console.log('Loaded from .env:', { projectId, dataset })

export default defineCliConfig({
  api: {
    projectId,
    dataset
  },
  studioHost
})
