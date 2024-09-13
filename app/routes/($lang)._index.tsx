import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, Link, useParams } from "@remix-run/react";
import { FRONTPAGE_QUERYResult } from "../../sanity.types";
import { getFrontpageQuery } from "../queries/frontpage-queries";
import urlFor from "../utils/imageUrlBuilder";
import PurpleDot from "../assets/PurpleDot";
import GreenButton from "../assets/GreenButton";
import Newsletter from "../components/Newsletter";
import { createTexts, useTranslation } from "../utils/i18n";
import { useBackgroundColor } from "../utils/backgroundColor";
import { useEffect } from "react";
import { QueryResponseInitial } from "@sanity/react-loader";
import { loadQuery } from "../../cms/loader.server";
import { useQuery } from "../../cms/loader";
import { loadQueryOptions } from "../../cms/loadQueryOptions.server";
import GreenTriangle from "~/assets/GreenTriangle";
import NewsletterMarquee from "~/components/NewsletterMarquee";
import { getColor } from "~/utils/colorCombinations";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const { query, params: queryParams } = getFrontpageQuery(params);
  const initial = await loadQuery<FRONTPAGE_QUERYResult>(
    query,
    queryParams,
    options
  );
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

  const {
    bgColor,
    primaryText,
    secondaryBgColor,
    secondaryBorder,
    textColor,
    textColorBorder,
    portabletextStyle,
    quoteStyle,
  } = getColor(data?.event?.colorCombinationsNight);

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

        <div
          className={`flex flex-1 flex-col items-center justify-center mx-4`}
        >
          <div className="flex flex-row justify-center content-center w-full mt-4">
            <Link
              to={params.lang == "en" ? "/en/meny" : "/meny"}
              className="text-white w-1/5  text-left px-4 py-2 rounded self-center font-serif text-2xl lg:text-4xl hidden md:flex flex-row content-start"
              aria-label={t(texts.menuText)}
            >
              <div className="self-center animate-horizontal-bounce-left ">
                <GreenTriangle direction="left" />
              </div>
              <div className="px-4">{t(texts.menuButton)}</div>
            </Link>
            <img
              className="md:w-1/2"
              src={SvgUrl}
              alt={data?.event?.svgTitle?.alt || data?.svgTitle?.alt || "Logo"}
            />
            <Link
              to={params.lang == "en" ? "/en/program" : "/program"}
              className="text-white w-1/5 px-4 py-2 text-right rounded self-center font-serif text-2xl lg:text-4xl flex-row content-end hidden md:flex"
              aria-label={t(texts.programText)}
            >
              <div className="px-4 ml-auto">Program</div>
              <div className="self-center animate-horizontal-bounce-right">
                <GreenTriangle direction="right" />
              </div>
            </Link>
          </div>
          <div className="flex md:hidden flex-row  w-full mt-4">
            <Link
              to={params.lang == "en" ? "/en/meny" : "/meny"}
              className="text-white w-1/2  text-left py-2 rounded self-center font-serif text-2xl lg:text-4xl flex flex-row content-start"
              aria-label={t(texts.menuText)}
            >
              <div className="self-center ml-auto animate-horizontal-bounce-left ">
                <GreenTriangle direction="left" />
              </div>
              <div className="px-4">{t(texts.menuButton)}</div>
            </Link>
            <Link
              to={params.lang == "en" ? "/en/program" : "/program"}
              className="text-white w-1/2 py-2 text-right rounded self-center font-serif text-2xl lg:text-4xl flex-row content-end flex"
              aria-label={t(texts.programText)}
            >
              <div className="px-4">Program</div>
              <div className="self-center animate-horizontal-bounce-right">
                <GreenTriangle direction="right" />
              </div>
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
  menuText: {
    nb: "Gå til menyside",
    en: "Go to menu page",
  },
  buyTicket: {
    nb: "Kjøp \nBillett",
    en: "Buy \nTicket",
  },
  menuButton: {
    nb: "Meny",
    en: "Menu",
  },
});
