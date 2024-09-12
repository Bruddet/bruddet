import { defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default {
  name: "customImage",
  title: "Bilde",
  type: "image",
  icon: ImageIcon,
  options: {
    hotspot: true,
  },

  fields: [
    defineField({
      title: "Alternativ Tekst",
      name: "alt",
      type: "string",
      description:
        "Beskriv bildet for skjermlesere. Dette er påkrevd for å oppfylle webtilgjengelighetsstandarder(UU).",
      validation: (rule) => [
        rule.required().min(1).error("Bildetekst er påkrevd"),
      ],
    }),
  ],
};
