import { defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export default {
  name: "roleGroup",
  title: "Rollegruppe",
  type: "object",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Gruppe",
      placeholder: "Medvirkende",
      type: "string",
      validation: (rule) =>
        rule.required().min(2).max(50).error(`Må ha navn på minst 2 bokstaver`),
    }),
    defineField({
      name: "persons",
      title: "Personer",
      type: "array",
      validation: (rule) =>
        rule.required().min(1).error("Må ha minst en person"),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "person",
              title: "Person",
              type: "reference",
              to: [{ type: "person" }],
              options: {
                filter: ({ document }) => {
                  return {
                    filter: "language == $lang",
                    params: { lang: document.language },
                  };
                },
              },
            },
            {
              name: "occupation",
              title: "Stilling",
              description: "Legg til stilling",
              type: "string",
              validation: (rule) =>
                rule
                  .required()
                  .min(1)
                  .max(40)
                  .error(`Må ha stilling på minst 2 bokstaver`),
            },
            {
              name: "description",
              title: "Beskrivelse/tekst",
              description: "Tekst som vises i rolleblokken",
              type: "text",
              validation: (rule) =>
                rule.max(300).error(`Anbefaler kortere tekst`),
            },
          ],
          preview: {
            select: {
              title: "person.name",
              subtitle: "occupation",
            },
          },
        },
      ],
    }),
  ],
};
