import { defineField } from "sanity";

export default {
  name: "quoteBomb",
  title: "Sitatbombe",
  type: "text",
  fields: [
    defineField({
      title: "Sitat",
      name: "quote",
      type: "string",
    }),
  ],
};
