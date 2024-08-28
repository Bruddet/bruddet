import type { loadQuery } from "@sanity/react-loader";
import { destroySession, getSession } from "~/sessions";
import { client } from "./clientConfig";

export async function loadQueryOptions(
  headers: Headers
): Promise<{ preview: boolean; options: Parameters<typeof loadQuery>[2] }> {
  const previewSession = await getSession(headers.get("Cookie"));
  await destroySession(previewSession);
  const preview = previewSession.get("projectId") === client.config().projectId;
  const studioUrl = "/studio";

  if (preview && !process.env.SANITY_API_READ_TOKEN) {
    throw new Error(
      `Cannot activate preview mode without a "SANITY_API_READ_TOKEN" token in your environment variables. \n\n
      Create one with "Viewer" permissions at\n\n
      https://sanity.io/manage/project/${client.config().projectId}/api#tokens`
    );
  }

  return {
    preview,
    options: {
      perspective: preview ? "previewDrafts" : "published",
      stega: preview ? { enabled: true, studioUrl: studioUrl } : undefined,
    },
  };
}
