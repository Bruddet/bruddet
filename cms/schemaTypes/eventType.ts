import { defineField, defineType } from "sanity";
import { isUniqueOtherThanLanguage } from "../structure/documentInternationalization";
import { CalendarIcon } from "@sanity/icons";

export const eventType = defineType({
  name: "event",
  title: "Forestilling",
  type: "document",
  groups: [
    { title: "Innhold", name: "content", default: true },
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
      validation: (rule) => [
        rule
          .required()
          .min(2)
          .error(
            `Tittel er påkrevd for å poste et arrangement, minimum lengde på 2 tegn.`
          ),
        rule.max(100).warning("Anbefaler kortere tittel."),
      ],
    }),
    defineField({
      name: "slug",
      title: "slug",
      type: "slug",
      options: { source: "title", isUnique: isUniqueOtherThanLanguage },
      hidden: ({ document }) => !document?.title,
      description: "Url: bruddet.no/xxx",
      group: "seo",
      validation: (rule) => [rule.required().error("Må ha en slug")],
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "customImage",
      group: "visual",
      options: {
        hotspot: true,
      },
      validation: (rule) => [
        rule.required().assetRequired().error("Bilde er påkrevd."),
      ],
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "eventGenre",
      title: "Sjanger",
      type: "eventGenre",
      group: "content",
    }),
    defineField({
      name: "colorCombinationsNight",
      title: "Fargekombinasjon",
      type: "colorCombinationsNight",
      group: "visual",
      validation: (rule) => [rule.required().error("Må velge farger")],
    }),
    defineField({
      name: "imageMask",
      title: "Visning av bildet",
      type: "imageMask",
      group: "visual",
    }),
    defineField({
      name: "svgTitle",
      title: "Stor grafisk tittel",
      description: "SVG file av tittel",
      type: "customImage",
      group: "visual",
      validation: (rule) => [
        rule.required().assetRequired().error("Grafisk tittel er påkrevd"),
      ],
      options: {
        accept: ".svg",
      },
    }),
    defineField({
      name: "labels",
      title: "Vaskelapper",
      description: "Tagger som kommer i bokser under tittel",
      type: "array",
      group: "content",
      of: [
        {
          type: "string",
          validation: (rule) => [
            rule.required().min(2).error(`Minimum lengde 2 tegn`),
            rule.max(20).warning("Anbefaler kortere tekst."),
          ],
        },
      ],
    }),
    defineField({
      name: "dates",
      title: "Datoer",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          icon: CalendarIcon,

          fields: [
            {
              name: "date",
              type: "datetime",
              title: "Dato",
              validation: (rule) => rule.required().error("Dato er påkrevd."),
            },
            {
              name: "url",
              type: "url",
              title: "Link",
              validation: (rule) => [rule.required().error("URL er påkrevd.")],
            },
            {
              name: "status",
              title: "Antall billetter igjen",
              type: "number",
              initialValue: 1,
              options: {
                list: [
                  { title: "Normalt", value: 1 },
                  { title: "Få billetter igjen", value: 2 },
                  { title: "Utsolgt", value: 3 },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              validation: (rule) => [
                rule.required().error("Status er påkrevd."),
              ],
            },
          ],
        },
      ],
      validation: (rule) => [
        rule.required().min(1).error("Minst en dato er påkrevd."),
      ],
    }),
    defineField({
      name: "duration",
      title: "Varighet",
      type: "string",
      placeholder: "e.g 1 time og 30 minutter",
      group: "content",
    }),
    defineField({
      name: "text",
      title: "Beskrivelse",
      type: "content",
      group: "content",
      description:
        "Innhold: Mulighet for å legge inn tekst, bilde, video, sitat og anmeldelse",
      options: {
        documentInternationalization: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: "roleGroups",
      title: "Roller",
      description: "Lag egne rollegrupper",
      type: "array",
      of: [{ type: "roleGroups" }],
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
