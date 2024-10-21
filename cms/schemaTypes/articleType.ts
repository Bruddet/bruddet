import { defineField, defineType } from "sanity";
import { isUniqueOtherThanLanguage } from "../structure/documentInternationalization";
import { COLOR_COMBINATIONS } from "./objects/colorCombination";

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
      name: "ingress",
      title: "Ingress",
      type: "string",
      description: "Teksten under tittel",
      group: "content",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "colorCombination",
      title: "Fargekombinasjon",
      type: "string",
      options: {
        list: COLOR_COMBINATIONS.map(({ title, value }) => ({ title, value })),
        layout: "radio",
      },
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
      name: "galleryDisplayType",
      title: "Visning av bilder",
      type: "number",
      initialValue: 1,
      group: "content",
      description:
        "Her kan du bestemme om bildene i høyre kolonne skal skiftes ut ved scroll (som er det anbefalte), eller hvis alle bildene skal vises under hverandre hele tiden.",
      options: {
        list: [
          {
            title: "Vis ett bilde av gangen (skifter ved scrolling) - anbefalt",
            value: 1,
          },
          {
            title: "Vis alle bilder samtidig, plassert under hverandre",
            value: 2,
          },
        ],
        layout: "radio",
        direction: "horizontal",
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
      name: "roleGroups",
      title: "Roller",
      description: "Lag egne rollegrupper",
      type: "array",
      of: [{ type: "roleGroup" }],
      group: "content",
      options: {
        documentInternationalization: {
          exclude: true,
        },
      },
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
