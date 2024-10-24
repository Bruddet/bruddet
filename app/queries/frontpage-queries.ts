import { Params } from "@remix-run/react";
import groq from "groq";

export function getFrontpageQuery(params: Params<string>) {
  const lang = params.lang ?? "nb";

  const FRONTPAGE_QUERY = groq`*[_type=="frontpage" && language==$lang][0]{
  title, 
  image, 
  language,
  svgTitle, 
  metaTitle, 
  metaDescription,
  hexagonButton,
  footerMarquee,
  event->{
    title, 
    text, 
    image, 
    slug, 
    metaTitle, 
    metaDescription, 
    svgTitle,
    colorCombination
    }
  }`;

  return { query: FRONTPAGE_QUERY, params: { lang } };
}

export function getFooterMarqueeText(language: string) {
  const lang = language ?? "nb";

  const FOOTER_MARQUEE_TEXT_QUERY = groq`*[_type=="frontpage" && language==$lang][0] {
    footerMarquee{
        link->{
        _type,
        slug
        },
        text,
        hoverText
        }
      }`;

  return { query: FOOTER_MARQUEE_TEXT_QUERY, params: { lang } };
}
