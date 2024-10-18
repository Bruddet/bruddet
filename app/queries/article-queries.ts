import { Params } from "@remix-run/react";
import groq from "groq";

export function getArticlesQuery(params: Params<string>) {
  const lang = params.lang ?? "nb";
  const ARTICLES_QUERY = groq`*[_type=="article" && language==$lang]{_id, slug, title}`;
  return { query: ARTICLES_QUERY, params: { lang } };
}

export function getArticleQuery(params: Params<string>) {
  const id = params.id;
  const lang = params.lang ?? "nb";

  try {
    if (!id) {
      throw new Response("Event ID is required", { status: 404 });
    }
    if (params.id == "noSlugFound") {
      throw new Response("No translation found for this slug", { status: 404 });
    }
    if (!params.lang) {
      params = { lang: "nb", id: id };
    }
  } catch (error) {
    throw new Error("Params not found");
  }
  const ARTICLE_QUERY = groq`*[_type=="article" && slug.current==$id && language==$lang][0]{
    title, 
    slug, 
    metaTitle, 
    metaDescription, 
    colorCombination, 
    image, 
    text[]{..., 
      _type=="video" => {
        title, muxVideo{asset->{playbackId}
        }
      }
    }, 
    video{
      title, 
      muxVideo{
        asset->{
          playbackId}
        }
    },
    'event': event->{slug},
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      slug,
      language,
      }
    }`;
  return { query: ARTICLE_QUERY, params };
}
