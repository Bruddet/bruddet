export default {
  name: "expandableContent",
  type: "array",
  title: "Content",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Heading 5", value: "h5" },
        { title: "Heading 6", value: "h6" },
      ],
    },
    {
      type: "customImage",
    },
  ],
};
