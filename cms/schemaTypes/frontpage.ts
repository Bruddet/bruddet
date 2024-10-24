import { defineType, defineField } from "sanity";

export const frontpage = defineType({
  name: "frontpage",
  title: "Forside",
  type: "document",
  groups: [
    { title: "Standard visning", name: "content", default: true },
    { title: "Hovedforestilling", name: "event" },
    { title: "SEO", name: "seo" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      group: "content",
      validation: (rule) => [
        rule.max(100).warning("Må ha en kortere tittel."),
        rule.required().min(1).error("Tittel er påkrevd"),
      ],
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "image",
      title: "Bakgrunnsbilde",
      description:
        "Standard bakgrunnsbilde som brukes om det ikke er valgt en hovedforestilling",
      type: "customImage",
      group: "content",
      validation: (rule) => [
        rule.required().error("Bakgrunnsbilde er påkrevd"),
      ],
    }),
    defineField({
      name: "svgTitle",
      title: "Stor grafisk tittel",
      description: "SVG fil av tittel",
      type: "customImage",
      group: "content",
      validation: (rule) => [
        rule.required().error("Grafisk tittel er påkrevd"),
      ],
      options: {
        accept: ".svg",
      },
    }),
    defineField({
      name: "event",
      title: "Hovedforestilling",
      type: "reference",
      group: "event",
      description:
        "Hvis det ikke skal være en forestilling i fokus, skal dette valget være tomt.",
      to: [{ type: "event" }],
      options: {
        filter: ({ document }) => {
          return {
            filter: "language == $lang",
            params: { lang: document.language },
          };
        },
      },
    }),
    defineField({
      name: "hexagonButton",
      title: "Hexagon knapp",
      type: "object",
      group: "content",
      description:
        "Legg til tittel og lenke på hexagon-knappen som vises på forsiden. OBS! det er opp til redaktøren og velge ord som passer med formen. Bruk understrek '_' mellom ord for å få ny linje. Eksempel: 'Program_slipp'",
      fields: [
        {
          name: "text",
          title: "Tekst",
          type: "string",
        },
        {
          name: "link",
          title: "Link",
          type: "reference",
          to: [{ type: "event" }, { type: "article" }],
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
        },
      ],
    }),
    defineField({
      name: "footerMarquee",
      title: "Banner i footer",
      type: "object",
      group: "content",
      description:
        "Legg til tekst og lenke på banneret i footeren på forsiden.",
      fields: [
        {
          name: "text",
          title: "Tekst",
          type: "string",
        },
        {
          name: "hoverText",
          title: "'Hover' tekst",
          description: "Tekst som vises i banneret når man hovrer over",
          type: "string",
        },
        {
          name: "link",
          title: "Link",
          type: "reference",
          to: [{ type: "event" }, { type: "article" }],
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
        },
      ],
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
