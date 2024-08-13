import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, Link, useParams } from "@remix-run/react";
import { FRONTPAGE_QUERYResult } from "../../sanity/types";
import { getFrontpageQuery } from "../queries/frontpage-queries";
import urlFor from "../utils/imageUrlBuilder";
import PurpleDot from "../assets/PurpleDot";
import GreenButton from "../assets/GreenButton";
import Newsletter from "../components/Newsletter";
import { createTexts, useTranslation } from "../utils/i18n";
import { useBackgroundColor } from "../utils/backgroundColor";
import { useEffect } from "react";
import { QueryResponseInitial } from "@sanity/react-loader";
import { loadQuery } from "../../sanity/loader.server";
import { useQuery } from "../../sanity/loader";

export async function loader({ params }: LoaderFunctionArgs) {
  const { query, params: queryParams } = getFrontpageQuery(params);
  const initial = await loadQuery<FRONTPAGE_QUERYResult>(query, queryParams);
  const event = initial.data;

  if (!event) {
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
    description: { [key: string]: string };
  } = {
    description: {
      en: "The homepage for Bruddet",
      nb: "Hjemmesiden til Bruddet",
    },
  };
  const description = texts.description[language];
  const sanityData = data?.initial.data;

  if (!sanityData) {
    return [
      { title: "Bruddet" },
      {
        property: "og:description",
        content: description,
      },
    ];
  }

  return [
    { title: sanityData.metaTitle ?? "Bruddet" },
    {
      property: "og:description",
      content: sanityData.metaDescription ?? description,
    },
  ];
};

export default function Index() {
  const { initial, query, queryParams } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<FRONTPAGE_QUERYResult>;
    query: string;
    queryParams: Record<string, string>;
  };

  const { data } = useQuery<typeof initial.data>(query, queryParams, {
    initial,
  });

  const { t } = useTranslation();
  const imageUrl = urlFor(
    data?.event?.image?.asset?._ref || data?.image?.asset?._ref || ""
  );
  const SvgUrl = urlFor(
    data?.event?.svgTitle?.asset?._ref || data?.svgTitle?.asset?._ref || ""
  );
  const { setColor } = useBackgroundColor();
  useEffect(() => {
    setColor("bg-white");
  }, [setColor]);
  const params = useParams();
  const styling = data?.event ? "justify-end mb-6" : "justify-center";

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-[100dvh] w-full font-serif"
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: "100dvh",
      }}
      aria-label={
        data?.event?.image?.alt || data?.image?.alt || "Background image"
      }
    >
      <div className="flex flex-col h-[100dvh] w-full overflow-hidden">
        <div className="text-white text-xl mt-10 flex flex-col items-center">
          <Newsletter />
        </div>

        <div className={`flex flex-1 flex-col items-center ${styling} mx-4`}>
          <img
            className="lg:w-1/3"
            src={SvgUrl}
            alt={data?.event?.svgTitle?.alt || data?.svgTitle?.alt || "Logo"}
          />

          <div className="flex flex-row justify-center content-center w-full mt-4">
            <Link
              to={params.lang == "en" ? "/en/info" : "/info"}
              className="text-white w-48  text-right px-4 py-2 rounded self-center font-serif text-2xl lg:text-4xl"
              aria-label={t(texts.infoText)}
            >
              Info
            </Link>
            <div className="mb-4 mt-4 lg:mt-5 mx-1">
              <PurpleDot />
            </div>
            <Link
              to={params.lang == "en" ? "/en/program" : "/program"}
              className="text-white w-48 px-4 py-2 text-left rounded self-center font-serif text-2xl lg:text-4xl"
              aria-label={t(texts.programText)}
            >
              Program
            </Link>
          </div>

          {data?.event && (
            <div className="mb-4">
              <Link
                to={
                  "/event/" + data?.event?.slug?.current + "#tickets" ||
                  "/event"
                }
              >
                <button aria-label={t(texts.buyTicket)}></button>
                <GreenButton text={t(texts.buyTicket)} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const texts = createTexts({
  programText: {
    nb: "Gå til programside",
    en: "Go to program page",
  },
  infoText: {
    nb: "Gå til informasjonsside",
    en: "Go to information page",
  },
  buyTicket: {
    nb: "Kjøp \nBillett",
    en: "Buy \nTicket",
  },
});
