import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { createTexts, useTranslation } from "../utils/i18n";
import { PROGRAMPAGE_QUERYResult } from "../../sanity.types";
import Newsletter from "../components/Newsletter";
import { getProgramPageQuery } from "../queries/program-queries";
import { useBackgroundColor } from "../utils/backgroundColor";
import urlFor from "../utils/imageUrlBuilder";
import { loadQuery } from "../../cms/loader.server";
import { QueryResponseInitial } from "@sanity/react-loader";
import { useQuery } from "../../cms/loader";
import { loadQueryOptions } from "cms/loadQueryOptions.server";
import EventDateLabel from "~/components/EventLabels/EventDateLabel";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const { query, params: queryParams } = getProgramPageQuery(params);
  const initial = await loadQuery<PROGRAMPAGE_QUERYResult>(
    query,
    queryParams,
    options
  );
  const programPage = initial.data;

  if (!programPage) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { initial, query: query, queryParams: queryParams };
}

export const meta: MetaFunction<typeof loader> = ({ location, data }) => {
  const sanityData = data?.initial.data;

  if (!sanityData) {
    return [
      { title: "Program" },
      { property: "og:description", content: "Page not found" },
    ];
  }

  const path = location.pathname;
  let language = "nb";
  if (path.includes("/en")) {
    language = "en";
  }

  const texts: { description: { [key: string]: string } } = {
    description: {
      en: "Overview of program",
      no: "Oversikt over program",
    },
  };

  const description = texts.description[language];

  return [
    { title: sanityData.metaTitle ?? "Program" },
    {
      property: "og:description",
      content: sanityData.metaDescription ?? description,
    },
  ];
};

export default function Program() {
  const { initial, query, queryParams } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<PROGRAMPAGE_QUERYResult>;
    query: string;
    queryParams: Record<string, string>;
  };
  const { data } = useQuery<typeof initial.data>(query, queryParams, {
    initial,
  });

  const { setColor } = useBackgroundColor();

  const { t } = useTranslation();
  const [gifUrl, setGifUrl] = useState(urlFor(data?.gif?.asset?._ref || ""));

  useEffect(() => {
    setColor("bg-strongblue");
  }, [setColor]);
  const params = useParams();
  return (
    <div className="flex flex-col grow items-center text-black font-serif">
      <h1 className="text-5xl font-bold mb-12 hidden">{data?.title}</h1>
      <div className="flex flex-column w-[90vw]">
        <div className="w-3/4 vertical-align: middle; mx-auto">
          {data?.links?.map((link, index) => (
            <>
              <Link
                key={index}
                to={
                  link.slug?.current
                    ? `${params.lang === "en" ? "/en/event/" : "/event/"}${
                        link.slug.current
                      }`
                    : ""
                }
                onMouseEnter={() => {
                  setGifUrl(
                    urlFor(
                      link.gif?.asset?._ref ?? link.image.asset?._ref ?? ""
                    )
                  );
                }}
                onMouseOut={() => {
                  data?.gif && setGifUrl(urlFor(data.gif.asset?._ref ?? ""));
                }}
                className="align-middle md:w-1/3 md:text-center "
                aria-label={`${t(texts.labelText)} ${link.title}`}
              >
                <div className="md:hidden aspect-square w-full">
                  <img
                    className="inline-block object-cover w-full h-full"
                    src={urlFor(link?.image?.asset?._ref ?? "")}
                    alt={link?.image?.alt ?? ""}
                    key={index}
                  />
                </div>
                <p className="hover:underline text-2xl lg:text-4xl mt-4 mb-2">
                  {link.title}
                </p>
                {link.dates.length > 0 && (
                  <div className="md:hidden">
                    <EventDateLabel dateObj={link.dates} />
                  </div>
                )}
              </Link>
            </>
          ))}
        </div>
        {data?.gif && (
          <img
            src={gifUrl}
            alt={data.gif.alt}
            className="hidden absolute md:block w-1/3 max-h-[500px] object-cover top-0 right-0"
          />
        )}
      </div>
      <div className="mt-auto flex flex-col items-center text-lg lg:text-xl w-4/5 lg:w-2/3 z-10"></div>
    </div>
  );
}

const texts = createTexts({
  labelText: {
    en: "Go to",
    nb: "Gå til",
  },
});
