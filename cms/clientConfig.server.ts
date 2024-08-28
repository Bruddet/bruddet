import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "0chpibsu",
  dataset: "production",
  apiVersion: "2024-06-24",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_API_READ_TOKEN,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});
