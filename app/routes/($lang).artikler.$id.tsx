import MuxPlayer from "@mux/mux-player-react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { QueryResponseInitial } from "@sanity/react-loader";
import { useEffect } from "react";

import { handleScroll } from "~/components/EventLabels";
import { EventTextContent } from "~/components/EventTextContent";
import { primaryButtonClassName } from "~/styles/buttonConstants";
import { Custom_ARTICLE_QUERYResult } from "../../cms/customTypes";
import { useQuery } from "../../cms/loader";
import { loadQuery } from "../../cms/loader.server";
import { loadQueryOptions } from "../../cms/loadQueryOptions.server";
import PortableTextComponent from "../components/PortableTextComponent";
import { getArticleQuery } from "../queries/article-queries";
import { getColor } from "../utils/colorCombinations";
import { useBackgroundColor } from "../utils/hooks/useBackgroundColor";
import { useTranslation } from "../utils/i18n";
import { useSlugContext } from "../utils/i18n/SlugProvider";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const { query, params: queryParams } = getArticleQuery(params);
  const initial = await loadQuery<Custom_ARTICLE_QUERYResult>(
    query,
    queryParams,
    options
  );
  const article = initial.data;

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

  return { initial, query: query, queryParams: queryParams };
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
  };

  type TagText = {
    subtitle: string;
    _key: string;
  };

  const { data } = useQuery<typeof initial.data>(query, queryParams, {
    initial,
  });

  const bgColor = "bg-[#FFF8E8]";
  const { setColor } = useBackgroundColor();
  const { setSlug } = useSlugContext();

  const { primaryTextColor } = getColor("creamBlue");

  useEffect(() => {
    setColor(bgColor);
    setSlug(language, data?._translations);
  });
  const { t, language } = useTranslation();

  return (
    <div className="flex flex-col mx-6 md:mx-8 lg:mx-24 mt-40 items-center">
      <h1 className="text-3xl lg:text-5xl font-normal md:text-left lg:text-center  max-w-[995px]">
        {data.title}
      </h1>
      <h2 className="text-lg lg:text-3xl mx-auto my-6 md:text-left lg:text-center max-w-[1000px] font-normal">
        {data.ingress}
      </h2>
      <div className="flex gap-2 flex-wrap">
        {data.tagTexts?.map((tagText) => (
          <button
            onClick={() => handleScroll((tagText as TagText)._key)}
            className={`px-2 ${primaryButtonClassName} h-10 border-box w-fit`}
          >
            {(tagText as TagText).subtitle}
          </button>
        ))}
      </div>
      {data.video?.muxVideo.asset && (
        <MuxPlayer
          disableCookies={true}
          playbackId={data.video.muxVideo.asset.playbackId}
          title={data.video.title || ""}
        />
      )}
      {data.text && (
        <PortableTextComponent data={data} textColor={primaryTextColor} />
      )}
      {data.event && (
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
      <EventTextContent textColor={primaryTextColor} data={data} />
    </div>
  );
}

const texts = {
  readMore: {
    en: "Read more about the event",
    nb: "Les mer om forestillingen",
  },
};
