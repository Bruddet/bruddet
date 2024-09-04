export default {
  name: "content",
  type: "array",
  title: "Content",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Heading 5", value: "h5" },
        { title: "Heading 6", value: "h6" },
      ],
    },
    {
      type: "customImage",
    },
    {
      type: "video",
    },
    {
      type: "quote",
    },
    {
      type: "review",
    },
    {
      type: "expandableBlock",
    },
  ],
};
