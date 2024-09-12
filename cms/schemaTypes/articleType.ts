import { defineField, defineType } from "sanity";
import { isUniqueOtherThanLanguage } from "../structure/documentInternationalization";
import { documentInternationalization } from "@sanity/document-internationalization";

export const articleType = defineType({
  name: "article",
  title: "Artikkel",
  type: "document",
  groups: [
    { title: "Innhold", name: "content" },
    { title: "Visuelt", name: "visual" },
    { title: "SEO", name: "seo" },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      group: "content",
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(100)
          .error(
            `Tittel er påkrevd for å poste en artikkel, minimum lengde på 2 og maksimum lengde på 100 tegn`
          ),
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "colorCombinationsDay",
      title: "Fargekombinasjon",
      type: "colorCombinationsDay",
      group: "visual",
      validation: (rule) => [rule.required().error("Må velge farger")],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", isUnique: isUniqueOtherThanLanguage },
      hidden: ({ document }) => !document?.title,
      description: "Url: bruddet.no/xxx",
      group: "seo",
      validation: (rule) => [rule.required().error("Må ha en slug")],
    }),
    defineField({
      name: "text",
      title: "Tekst",
      type: "content",
      description:
        "Innhold: Mulighet for å legge inn tekst, bilde, video, sitat og anmeldelse",
      group: "content",
      options: {
        documentInternationalization: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: "image",
      title: "Hovedbilde",
      type: "customImage",
      description: "Bildet som plasseres øverst på siden",
      group: "visual",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
      description: "Legg til en video",
      group: "visual",
    }),
    defineField({
      name: "event",
      type: "reference",
      description: "Referer til valgt forestilling",
      to: [{ type: "event" }],
      options: {
        filter: ({ document }) => {
          return {
            filter: "language == $lang",
            params: { lang: document.language },
          };
        },
        documentInternationalization: {
          exclude: true,
        },
      },
      group: "content",
    }),
    defineField({
      name: "metaTitle",
      title: "SEO tittel",
      type: "metaTitle",
      group: "seo",
      validation: (rule) => [rule.required().error("Må ha SEO tittel")],
    }),
    defineField({
      name: "metaDescription",
      title: "SEO beskrivelse",
      type: "metaDescription",
      group: "seo",
      validation: (rule) => [rule.required().error("Må ha SEO beskrivelse")],
    }),
  ],
});
