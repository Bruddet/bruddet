import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, Link, useParams, useLocation } from "@remix-run/react";
import { FRONTPAGE_QUERYResult } from "../../sanity.types";
import { getFrontpageQuery } from "../queries/frontpage-queries";
import urlFor from "../utils/imageUrlBuilder";
import HexagonBuyButton from "../assets/HexagonBuyButton";
import { createTexts, useTranslation } from "../utils/i18n";
import { useBackgroundColor } from "../utils/backgroundColor";
import { useEffect } from "react";
import { QueryResponseInitial } from "@sanity/react-loader";
import { loadQuery } from "../../cms/loader.server";
import { useQuery } from "../../cms/loader";
import { loadQueryOptions } from "../../cms/loadQueryOptions.server";
import { Navigation } from "~/components/Navigation";
import StickyFooter from "~/components/StickyFooter";

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
    setColor("bg-beige");
  }, [setColor]);

  return (
    <>
      <div
        className="flex grow bg-cover bg-center bg-no-repeat w-full font-serif"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        aria-label={"Background image"}
      >
        <Navigation />

        {data?.event && (
          <div className="absolute right-16 top-16">
            <HexagonBuyButton
              slug={data?.event?.slug?.current}
              text={t(texts.buyTicket)}
            />
          </div>
        )}
        <img
          className="md:w-1/2 m-auto"
          src={SvgUrl}
          alt={data?.event?.svgTitle?.alt || data?.svgTitle?.alt || "Logo"}
        />
      </div>
      <StickyFooter />
    </>
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
