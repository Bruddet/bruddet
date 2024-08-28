import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID ?? "0chpibsu",
  dataset: import.meta.env.VITE_SANITY_STUDIO_DATASET ?? "production",
  apiVersion: "2024-06-24",
  useCdn: true,
  perspective: "published",
  stega: {
    enabled: true,
    studioUrl: "/studio",
  },
});
