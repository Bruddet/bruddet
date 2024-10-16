import { Params } from "@remix-run/react";
import groq from "groq";

export function getMenuPageQuery(params: Params<string>) {
  const lang = params.lang ?? "nb";
  const MENUPAGE_QUERY = groq`*[_type=="menupage" && language==$lang]{title, metaTitle, metaDescription, articles[]{articleGroup, links[]->{_type, slug, language}}}[0]`;
  return { query: MENUPAGE_QUERY, params: { lang } };
}
