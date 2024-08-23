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
  event->{
    title, 
    text, 
    image, 
    slug, 
    metaTitle, 
    metaDescription, 
    svgTitle
    }
  }`;

  return { query: FRONTPAGE_QUERY, params: { lang } };
}
