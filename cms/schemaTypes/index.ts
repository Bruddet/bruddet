import { frontpage } from "./frontpage";
import { articleType } from "./articleType";
import { eventType } from "./eventType";
import { personType } from "./personType";
import customImage from "./objects/customImage";
import RichTextEditor from "./objects/RichTextEditor";
import { videoType } from "./objects/videoType";
import metaTitle from "./objects/metaTitle";
import metaDescription from "./objects/metaDescription";
import imageMask from "./objects/imageMask";
import roleGroup from "./objects/roleGroup";
import { reviewType } from "./objects/reviewType";
import eventGenre from "./objects/eventGenre";
import { programpage } from "./programpage";
import { expandableBlockType } from "./objects/expandableBlockType";
import { menuPage } from "./menupage";
import expandableContent from "./objects/expandableContent";

export const schemaTypes = [
  articleType,
  eventType,
  frontpage,
  personType,
  customImage,
  menuPage,
  expandableBlockType,
  expandableContent,
  RichTextEditor,
  roleGroup,
  videoType,
  metaTitle,
  metaDescription,
  imageMask,
  reviewType,
  eventGenre,
  programpage,
];
