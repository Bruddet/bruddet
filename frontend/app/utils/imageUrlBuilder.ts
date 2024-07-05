import { client } from "sanity/clientConfig";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

type Hotspot = {
  x?: number;
  y?: number;
};

export default function urlFor(source: string, hotspot?: Hotspot): string {
  if (!source) return "";

  if (hotspot && hotspot.x !== undefined && hotspot.y !== undefined) {
    return builder.image(source).focalPoint(hotspot?.x, hotspot?.y).url();
  }

  return builder.image(source).url();
}
