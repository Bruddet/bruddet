import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const expandableBlockType = defineType({
  name: "expandableBlock",
  title: "Ekspanderbar blokk",
  type: "document",
  preview: {
    select: {
      title: "title",
    },
  },
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "title",
      type: "text",
      title: "Tittel",
      validation: (rule) => [
        rule.required().min(2).error(`Tittel er påkrevd`),
        rule.required().max(100).warning(`Anbefaler kortere innhold.`),
      ],
    }),
    defineField({
      name: "content",
      type: "expandableContent",
      title: "Innhold",
      validation: (rule) => [
        rule.required().min(2).error(`Innhold er påkrevd`),
      ],
    }),
  ],
});
