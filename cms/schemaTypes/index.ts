import { frontpage } from "./frontpage";
import { articleType } from "./articleType";
import { eventType } from "./eventType";
import { personType } from "./personType";
import customImage from "./objects/customImage";
import { quoteType } from "./objects/quoteType";
import RichTextEditor from "./objects/RichTextEditor";
import { videoType } from "./objects/videoType";
import metaTitle from "./objects/metaTitle";
import metaDescription from "./objects/metaDescription";
import { colorCombinations } from "./objects/colorCombination";
import imageMask from "./objects/imageMask";
import roleGroups from "./objects/roleGroups";
import { reviewType } from "./objects/reviewType";
import eventGenre from "./objects/eventGenre";
import { programpage } from "./programpage";
import { expandableBlockType } from "./objects/expandableBlockType";
import { menuPage } from "./menupage";

export const schemaTypes = [
  articleType,
  eventType,
  frontpage,
  personType,
  customImage,
  menuPage,
  quoteType,
  expandableBlockType,
  RichTextEditor,
  roleGroups,
  videoType,
  metaTitle,
  metaDescription,
  colorCombinations,
  imageMask,
  reviewType,
  eventGenre,
  programpage,
];
