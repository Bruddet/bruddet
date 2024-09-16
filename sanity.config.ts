import { defineConfig, SanityClient, SanityDocumentLike } from "sanity";
import { visionTool } from "@sanity/vision";
import { muxInput } from "sanity-plugin-mux-input";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import { deskStructure } from "./cms/structure";
import { schemaTypes } from "./cms/schemaTypes";
import { presentationTool } from "sanity/presentation";
import {
  documentInternationalization,
  DeleteTranslationAction,
} from "@sanity/document-internationalization";
import { PluginConfig } from "./cms/structure/documentInternationalization";
import { userGuide } from "./cms/structure/UserGuide";

const singletonTypes = new Set(["frontpage"]);
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const STUDIO_BASE_PATH = "/studio";

//singleton pages. Before you add the type to singletontypes, the page should be created, since create is not a valid action for singleton types
const PROJECT_ID = "0chpibsu";
const DATASET = process.env.VITE_SANITY_STUDIO_DATASET ?? "production";
const SANITY_STUDIO_FRONTEND_URL =
  process.env.VITE_SANITY_STUDIO_FRONTEND_URL ?? "https://bruddet.vercel.app";

async function getDocumentPreviewUrl(
  document: SanityDocumentLike,
  client: SanityClient
) {
  const res = await client.fetch(
    `*[_id == $id][0]{"language": language,"slug": slug.current}`,
    {
      id: document._id,
    }
  );

  if (!res) {
    return "";
  }

  const basePath = "/studio/presentation?preview=";
  const languagePrefix = res?.language === "nb" ? "" : "en/";

  switch (document._type) {
    case "article": {
      return basePath + languagePrefix + "artikler/" + res.slug;
    }
    case "event": {
      return basePath + languagePrefix + "event/" + res.slug;
    }
    case "frontpage": {
      return basePath + languagePrefix + "/";
    }
    case "menupage": {
      return basePath + languagePrefix + "meny";
    }
    case "programpage": {
      return basePath + languagePrefix + "program";
    }
  }

  return "";
}

export default defineConfig({
  name: "default",
  title: "Bruddet",
  projectId: PROJECT_ID,
  dataset: DATASET,
  basePath: STUDIO_BASE_PATH,

  plugins: [
    structureTool({ structure: deskStructure }),
    documentInternationalization(PluginConfig),
    visionTool(),
    muxInput(),
    media(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: SANITY_STUDIO_FRONTEND_URL + "/resource/preview",
        },
      },
    }),
  ],
  tools: [userGuide()],
  schema: {
    types: schemaTypes,
    templates: (templates) => {
      return templates
        .filter(({ schemaType }) => !singletonTypes.has(schemaType))
        .filter(
          (template) => !["article", "event", "person"].includes(template.id)
        );
    },
  },
  document: {
    actions: (input, context) => {
      // add the delete translation action to all documents
      input.push(DeleteTranslationAction);

      // filter out actions that should not be available for singleton pages
      return singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input;
    },
    productionUrl: async (_, context) => {
      const { getClient, document } = context;
      const client = getClient({ apiVersion: "2023-05-31" });
      return getDocumentPreviewUrl(document, client);
    },
  },
});
