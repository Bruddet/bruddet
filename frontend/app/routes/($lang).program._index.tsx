import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, useLoaderData, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { createTexts, useTranslation } from "../utils/i18n";
import { PROGRAMPAGE_QUERYResult } from "../../sanity/types";
import Newsletter from "../components/Newsletter";
import { getProgramPageQuery } from "../queries/program-queries";
import { useBackgroundColor } from "../utils/backgroundColor";
import urlFor from "../utils/imageUrlBuilder";
import { loadQuery } from "../../sanity/loader.server";
import { QueryResponseInitial } from "@sanity/react-loader";
import { useQuery } from "../../sanity/loader";
import { loadQueryOptions } from "sanity/loadQueryOptions.server";
import { ResponseQueryOptions } from "@sanity/client/stega";

<<<<<<< HEAD
export async function loader({ params }: LoaderFunctionArgs) {
  const { query, params: queryParams } = getProgramPageQuery(params);
  const initial = await loadQuery<PROGRAMPAGE_QUERYResult>(query, queryParams);
=======
export async function loader({ params, request }: LoaderFunctionArgs) {
  const query = getProgramPageQuery(params);
  const {preview, options} = await loadQueryOptions(request.headers)
  const initial = await loadQuery<PROGRAMPAGE_QUERYResult>(query, params, options);
>>>>>>> 8e5d52f (Add working preview in presentation mode.)
  const programPage = initial.data;

  console.log("options: ", options)

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
<<<<<<< HEAD
  const { initial, query, queryParams } = useLoaderData<typeof loader>() as {
=======
  const { initial, query, sanityParams, options } = useLoaderData<typeof loader>() as {
>>>>>>> 8e5d52f (Add working preview in presentation mode.)
    initial: QueryResponseInitial<PROGRAMPAGE_QUERYResult>;
    query: string;
    queryParams: Record<string, string>;
  };

  const { data } = useQuery<typeof initial.data>(query, queryParams, {
    initial,
  }, );
  console.log("data: ", data)
  console.log("Sanity params: ", sanityParams)
  const { setColor } = useBackgroundColor();
  const { t } = useTranslation();
  const gifUrl = urlFor(data?.gif?.asset?._ref || "");
  useEffect(() => {
    setColor("bg-strongblue");
  }, [setColor]);
  const params = useParams();
  return (
    <div className="flex flex-col grow items-center text-white font-serif">
      <h1 className="text-5xl font-bold mb-12">{data?.title}</h1>
      <div className="flex flex-col items-center text-center font-normal gap-4 text-xl py-12 px-0">
        {data?.gif && (
          <img
            src={gifUrl}
            className="absolute w-2/3 right-[10vw] sm:w-1/3  lg:w-1/4 lg:right-[20vw] lg:bottom-5"
            alt={data.gif.alt}
          />
        )}

        {data?.links?.map((link, index) => (
          <Link
            key={index}
            to={
              link.slug?.current
                ? `${params.lang === "en" ? "/en/event/" : "/event/"}${
                    link.slug.current
                  }`
                : ""
            }
            className="z-10"
            aria-label={`${t(texts.labelText)} ${link.title}`}
          >
            <p className="p-4 hover:underline text-2xl lg:text-4xl">
              {link.title}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-auto flex flex-col items-center text-lg lg:text-xl w-4/5 lg:w-2/3 z-10">
        <Newsletter />
      </div>
    </div>
  );
}

const texts = createTexts({
  labelText: {
    en: "Go to",
    nb: "Gå til",
  },
});
