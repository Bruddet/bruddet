import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Hydrated } from "~/components/Hydrated";
import { Studio } from "sanity";
import config from "../../sanity.config";
import studio from "~/styles/studio.css?url";

export const meta: MetaFunction = () => [
  { title: "Sanity Studio" },
  { name: "robots", content: "noindex" },
];

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: studio }];
};

export default function StudioPage() {
  return (
    <div className="h-full">
      <Hydrated>
        <Studio config={config}></Studio>
      </Hydrated>
    </div>
  );
}
