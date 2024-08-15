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
import { presentationTool} from 'sanity/presentation'

//singleton pages. Before you add the type to singletontypes, the page should be created, since create is not a valid action for singleton types
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['frontpage'])
const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_FRONTEND_URL ?? 'https://bruddet.vercel.app'
const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID ?? '0chpibsu'
const DATASET = process.env.SANITY_STUDIO_DATASET ?? 'production'

async function getDocumentPreviewUrl(document, client){

  const res =  await client.fetch(
    `*[_id == $id][0]{"language": language,"slug": slug.current}`,
      {id: document._id}
  ) 

  if (!res) {
    return ""
  }

  const basePath = "/presentation?preview="
  const languagePrefix = res?.language === "nb" ? "" : "en/"

  const shouldRouteParamater = "&shouldRoute=1"

  switch(document._type) {
    case "article": {
      const typeSlug = res.language === "nb" ? "artikler/" : "artikler/"
      return basePath+languagePrefix+typeSlug+res.slug+shouldRouteParamater
    } case "event": {
      const typeSlug = res.language === "nb" ? "event/" : "event/"
      return basePath+languagePrefix+typeSlug+res.slug
    } case "frontpage": {
      return basePath+languagePrefix+"/"
    } case "infopage": { 
        return basePath+languagePrefix+"/info"
    } case "programpage" : {
      return basePath + languagePrefix+ "program"
    }
  }

  return ""
}

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
    productionUrl: async (_, context) => {
      const {getClient, document} = context
      const client = getClient({apiVersion: '2023-05-31'})
      return getDocumentPreviewUrl(document, client)
  },
}
})
