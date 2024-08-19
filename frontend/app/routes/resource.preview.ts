import {
  type ActionFunction,
  json,
  type LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { client } from "../../cms/sanity/clientConfig";

import { commitSession, destroySession, getSession } from "../sessions";

// A `POST` request to this route will exit preview mode
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }

  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

// A `GET` request to this route will enter preview mode
export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!process.env.SANITY_READ_TOKEN) {
    throw new Response("Preview mode missing token", { status: 401 });
  }

  const clientWithToken = client.withConfig({
    token: process.env.SANITY_READ_TOKEN,
  });

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    throw new Response("Invalid secret", { status: 401 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("projectId", client.config().projectId);

  const invalidUrlStart = ["structure", "presentation"];
  //Sanity often adds a redirect URL when we don't want to redirect. This code ignores these generated redirect urls.
  const shouldRedirect = !invalidUrlStart.includes(redirectTo.split("/")[1]);

  return redirect(shouldRedirect ? redirectTo : "/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
