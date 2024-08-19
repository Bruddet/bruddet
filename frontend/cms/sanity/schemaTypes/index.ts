import {frontpage} from './frontpage'
import {articleType} from './articleType'
import {eventType} from './eventType'
import {personType} from './personType'
import customImage from './objects/customImage'
import {infopage} from './infopage'
import {quoteType} from './objects/quoteType'
import RichTextEditor from './objects/RichTextEditor'
import {videoType} from '././objects/videoType'
import metaTitle from './objects/metaTitle'
import metaDescription from './objects/metaDescription'
import {colorCombinationsDay, colorCombinationsNight} from './objects/colorCombination'
import imageMask from './objects/imageMask'
import roleGroups from './objects/roleGroups'
import {reviewType} from './objects/reviewType'
import eventGenre from './objects/eventGenre'
import {programpage} from './programpage'
import {expandableBlockType} from './objects/expandableBlockType'

export const schemaTypes = [
  articleType,
  eventType,
  frontpage,
  personType,
  customImage,
  infopage,
  quoteType,
  expandableBlockType,
  RichTextEditor,
  roleGroups,
  videoType,
  metaTitle,
  metaDescription,
  colorCombinationsDay,
  colorCombinationsNight,
  imageMask,
  reviewType,
  eventGenre,
  programpage,
]
