import { stegaClean } from "@sanity/client/stega";

export function getImageMask(imageMask: string | undefined) {
  switch (stegaClean(imageMask)) {
    case "smallImageNotCoveringScreen":
      return "smallImageMask";
    case "bigImageCoveringScreen":
      return "bigImageMask";
    default:
      return "";
  }
}
