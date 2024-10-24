import { Params } from "@remix-run/react";
import groq from "groq";

export function getMenuPageQuery(params: Params<string>) {
  const lang = params.lang ?? "nb";
  const MENUPAGE_QUERY = groq`*[_type == "menupage" && language == $lang] {
    metaTitle, 
    metaDescription, 
    links[]->{title,
    slug,
    _type,
    text[style in ["h1","h2", "h3", "h4", "h5"]]{
    defined(_key) => {_key},
    "subtitle": children[0].text,
    "slug": ^.slug.current
    }[defined(subtitle)],
    }}[0]`;
  return { query: MENUPAGE_QUERY, params: { lang } };
}
