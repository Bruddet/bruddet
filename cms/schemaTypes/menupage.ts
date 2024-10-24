import { defineField, defineType } from "sanity";

export const menuPage = defineType({
  name: "menupage",
  title: "Informasjonsside",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "metaTitle",
      title: "SEO tittel",
      type: "metaTitle",
      initialValue: "Meny",
      validation: (rule) => [rule.required().error("Må ha SEO tittel")],
    }),
    defineField({
      name: "metaDescription",
      title: "SEO beskrivelse",
      type: "metaDescription",
      initialValue: "Oversikt over menysider",
      validation: (rule) => [rule.required().error("Må ha SEO beskrivelse")],
    }),
    defineField({
      name: "links",
      title: "Undersider",
      type: "array",
      description:
        "Velg hvilke undersider, av typen Artikler, som skal vises på Menysiden",
      of: [
        {
          type: "reference",
          to: [{ type: "article" }],
          options: {
            filter: ({ document }) => {
              return {
                filter: "language == $lang",
                params: { lang: document.language },
              };
            },
          },
        },
      ],
      options: {
        documentInternationalization: {
          exclude: true,
        },
      },
    }),
  ],
});
