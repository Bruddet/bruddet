import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const quoteType = defineType({
  name: "quote",
  title: "Sitat",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "content",
      type: "text",
      title: "Innhold",
      validation: (rule) => [
        rule
          .required()
          .min(2)
          .error(
            `Innhold er påkrevd for å poste et sitat, minimum lengde på 2 tegn`
          ),
        rule.required().max(100).warning(`Anbefaler kortere innhold.`),
      ],
    }),
    defineField({
      name: "source",
      type: "string",
      title: "Kilde",
      placeholder: "e.g. Ola Nordmann",
      validation: (rule) => [
        rule
          .required()
          .min(2)
          .error(
            `Kilde er påkrevd for å poste et sitat, minimum lengde på 2 tegn`
          ),
      ],
    }),
    defineField({
      name: "company",
      type: "string",
      title: "Medie",
      placeholder: "e.g. Aftenposten",
    }),
    defineField({
      name: "date",
      type: "datetime",
      title: "Dato for sitat",
    }),
  ],
});
