import { client } from "../../cms/clientConfig";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

type Hotspot = {
  x?: number;
  y?: number;
};

export default function urlFor(
  source: string | undefined,
  hotspot?: Hotspot
): string {
  if (!source) return "";

  if (hotspot && hotspot.x !== undefined && hotspot.y !== undefined) {
    return builder.image(source).focalPoint(hotspot?.x, hotspot?.y).url();
  }

  return builder.image(source).url();
}
