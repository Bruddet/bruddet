import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {
  documentInternationalization,
  DeleteTranslationAction,
} from '@sanity/document-internationalization'
import {deskStructure} from './structure'
import {PluginConfig} from './structure/documentInternationalization'
import {muxInput} from 'sanity-plugin-mux-input'
import {userGuide} from './structure/UserGuide'
import {media} from 'sanity-plugin-media'
import {defineLocations, presentationTool} from 'sanity/presentation'

//singleton pages. Before you add the type to singletontypes, the page should be created, since create is not a valid action for singleton types
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['frontpage'])
const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_FRONTEND_URL ?? 'https://bruddet.vercel.app'
const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID ?? '0chpibsu'
const DATASET = process.env.SANITY_STUDIO_DATASET ?? 'production'

export default defineConfig({
  name: 'default',
  title: 'Bruddet',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    documentInternationalization(PluginConfig),
    structureTool({structure: deskStructure}),
    visionTool(),
    muxInput(),
    media(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: SANITY_STUDIO_PREVIEW_URL + '/resource/preview',
        },
      },
      /*       resolve: {
        locations: {
          record: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
              type: '_type',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/records/${doc?.slug}`,
                },
                {title: 'Home', href: `/`},
              ],
            }),
          }),
        },
      }, */
    }),
  ],

  tools: [userGuide()],

  schema: {
    types: schemaTypes,
    templates: (templates) => {
      return templates
        .filter(({schemaType}) => !singletonTypes.has(schemaType))
        .filter((template) => !['article', 'event', 'person'].includes(template.id))
    },
  },
  document: {
    actions: (input, context) => {
      // add the delete translation action to all documents
      input.push(DeleteTranslationAction)

      // filter out actions that should not be available for singleton pages
      return singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input
    },
  },
})
