import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const personType = defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: UserIcon,
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      validation: (Rule) => Rule.required().error("Navn er påkrevd"),
    }),

    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "customImage",
      description: "Legg til et bilde",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "text",
      title: "Biografi",
      description: "Hold det kort",
      type: "string",
    }),
  ],
});
