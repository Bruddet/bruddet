import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID ?? "0chpibsu",
  dataset: import.meta.env.VITE_SANITY_STUDIO_DATASET ?? "production",
  apiVersion: "2024-06-24",
  useCdn: import.meta.env.VITE_SANITY_STUDIO_USE_CDN ?? true,
  token: import.meta.env.VITE_SANITY_READ_TOKEN,
  perspective: "published",
  stega: {
    enabled: import.meta.env.VITE_SANITY_STUDIO_STEGA_ENABLED === "true",
    studioUrl: "/studio",
  },
});
