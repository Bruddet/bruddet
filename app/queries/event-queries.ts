import { Params } from "@remix-run/react";
import groq from "groq";

export function getEventQuery(params: Params<string>) {
  const id = params.id;
  const lang = params.lang ?? "nb";
  try {
    if (!id) {
      throw new Response("Event ID is required", { status: 404 });
    }

    if (id == "noSlugFound") {
      throw new Response("No event found for this slug", { status: 404 });
    }

    if (!params.lang) {
      params = { lang: "nb", id: id };
    }
  } catch (error) {
    throw new Error("Params not found");
  }
  const EVENT_QUERY = groq`*[_type=="event" && language==$lang && slug.current==$id][0]{
    metaTitle,
    metaDescription,
    title, 
    image,
    imageMask, 
    colorCombinationsNight, 
    dates, 
    duration,
    labels,
    text[]{..., _type=="video" => {title, muxVideo{asset->{playbackId}}}},
    eventGenre, 
    roleGroups[]{
      name, 
      persons[]{
      occupation, 
      person->{name, image, text}
      }
    },
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    slug,
    language,
    }
  }`;

  return { query: EVENT_QUERY, params: { lang, id } };
}
