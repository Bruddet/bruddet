import { defineField } from "sanity";
import { CommentIcon } from "@sanity/icons";

export default {
  name: "quoteBomb",
  title: "Sitatbombe",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      title: "Sitat",
      name: "quote",
      type: "text",
      description:
        "OBS: redaktør må selv passe på ord-deling for at det skal se bra ut, da figuren ikke tilpasser seg tekst.",
      validation: (rule) => [rule.max(100).warning("Anbefaler kortere quote.")],
    }),
  ],
};
