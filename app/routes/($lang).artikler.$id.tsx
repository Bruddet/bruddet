import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Custom_ARTICLE_QUERYResult } from "../../cms/customTypes";
import { getColor } from "../utils/colorCombinations";
import { getArticleQuery } from "../queries/article-queries";
import PortableTextComponent from "../components/PortableTextComponent";
import urlFor from "../utils/imageUrlBuilder";
import MuxPlayer from "@mux/mux-player-react";
import { useBackgroundColor } from "../utils/hooks/useBackgroundColor";
import { useEffect } from "react";
import { useTranslation } from "../utils/i18n";
import { useSlugContext } from "../utils/i18n/SlugProvider";
import { loadQuery } from "../../cms/loader.server";
import { QueryResponseInitial } from "@sanity/react-loader";
import { useQuery } from "../../cms/loader";
import { loadQueryOptions } from "../../cms/loadQueryOptions.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const { query, params: queryParams } = getArticleQuery(params);
  const initial = await loadQuery<Custom_ARTICLE_QUERYResult>(
    query,
    queryParams,
    options
  );
  const article = initial.data;
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!article) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  if (query == "No translation with this slug") {
    throw new Response("No translation found", {
      status: 404,
    });
  }

  return {
    initial,
    query: query,
    queryParams: queryParams,
    googleMapsApiKey: googleMapsApiKey,
  };
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  const path = location.pathname;
  let language = "nb";
  if (path.includes("/en")) {
    language = "en";
  }
  const texts: {
    title: { [key: string]: string };
    description: { [key: string]: string };
  } = {
    title: {
      en: "Artikkel",
      nb: "Article",
    },
    description: {
      en: "An article",
      nb: "En artikkel",
    },
  };

  const title = texts.title[language];
  const description = texts.description[language];

  const sanityData = data?.initial.data;

  if (!sanityData) {
    return [
      { title: title },
      {
        property: "og:description",
        content: description,
      },
    ];
  }

  return [
    { title: sanityData.metaTitle ?? title },
    {
      property: "og:description",
      content: sanityData.metaDescription ?? description,
    },
  ];
};

export default function Article() {
  const { initial, query, queryParams } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<Custom_ARTICLE_QUERYResult>;
    query: string;
    queryParams: Record<string, string>;
    googleMapsApiKey: string;
  };

  const { data } = useQuery<typeof initial.data>(query, queryParams, {
    initial,
  });

  const bgColor = "bg-[#FFF8E8]";
  const { setColor } = useBackgroundColor();
  const { setSlug } = useSlugContext();

  const { primaryTextColor } = getColor(data?.colorCombination || "creamBlue");

  useEffect(() => {
    setColor(bgColor);
    setSlug(language, data?._translations);
  });
  const { t, language } = useTranslation();

  return (
    <div
      className={`bg-[#FFF8E8] flex flex-col items-center grow mx-6 self-center md:w-full lg:w-1/2`}
    >
      <h1 className="text-4xl">{data.title}</h1>
      {data.image && (
        <img
          className="w-3/4 md:w-3/4 lg:w-1/2"
          src={urlFor(data.image.asset?._ref || "")}
          alt={data.image.alt}
        ></img>
      )}
      {data.video?.muxVideo.asset && (
        <MuxPlayer
          disableCookies={true}
          playbackId={data.video.muxVideo.asset.playbackId}
          title={data.video.title || ""}
        />
      )}
      {data?.text && (
        <PortableTextComponent data={data.text} textColor={primaryTextColor} />
      )}
      {data?.event && (
        <Link
          to={
            language == "en"
              ? `/en/event/${data.event?.slug?.current}`
              : `/event/${data.event?.slug?.current}`
          }
        >
          {t(texts.readMore)}
        </Link>
      )}
    </div>
  );
}

const texts = {
  readMore: {
    en: "Read more about the event",
    nb: "Les mer om forestillingen",
  },
};
