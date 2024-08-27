import { Params } from "@remix-run/react";
import groq from "groq";

export function getProgramPageQuery(params: Params<string>) {
  const lang = params.lang ?? "nb";
  const PROGRAMPAGE_QUERY = groq`*[_type=="programpage" && language==$lang]{metaTitle, metaDescription, title, text,gif, links[]->{title, slug, gif, image}}[0]`;
  return { query: PROGRAMPAGE_QUERY, params: { lang } };
}
