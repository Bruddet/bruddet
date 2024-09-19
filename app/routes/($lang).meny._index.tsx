import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  MetaFunction,
  useLoaderData,
  useLocation,
  useParams,
} from "@remix-run/react";
import { useEffect } from "react";
import { MENUPAGE_QUERYResult } from "../../sanity.types";
import { getMenuPageQuery } from "../queries/menu-queries";
import { useBackgroundColor } from "../utils/backgroundColor";
import { useTranslation } from "../utils/i18n";
import { loadQuery } from "../../cms/loader.server";
import { QueryResponseInitial } from "@sanity/react-loader";
import { useQuery } from "../../cms/loader";
import { loadQueryOptions } from "../../cms/loadQueryOptions.server";
import { Navigation } from "~/components/Navigation";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const { query, params: queryParams } = getMenuPageQuery(params);
  const initial = await loadQuery<MENUPAGE_QUERYResult>(
    query,
    queryParams,
    options
  );
  const menuPage = initial.data;

  if (!menuPage) {
    throw new Response("Not Found", {
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
  const texts: { description: { [key: string]: string } } = {
    description: {
      en: "Overview of information",
      nb: "Oversikt over informasjon",
    },
  };

  const description = texts.description[language];
  const sanityData = data?.initial.data;

  if (!sanityData) {
    return [
      { title: "Meny" },
      {
        property: "og:description",
        content: description,
      },
    ];
  }

  return [
    { title: sanityData.metaTitle ?? "Meny" },
    {
      property: "og:description",
      content: sanityData.metaDescription ?? description,
    },
  ];
};

function RedirectType(type: string) {
  if (type == "article") {
    return "/artikler";
  } else if (type == "event") {
    return "/event";
  } else {
    return "";
  }
}

export default function Info() {
  const { initial, query, queryParams } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<MENUPAGE_QUERYResult>;
    query: string;
    queryParams: Record<string, string>;
  };
  const { data } = useQuery<typeof initial.data>(query, queryParams, {
    initial,
  });

  const { setColor } = useBackgroundColor();
  useEffect(() => {
    setColor("bg-lightblue");
  }, [setColor]);
  const params = useParams();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col grow items-center text-[#1B1C20] font-serif">
      <Navigation />

      <h1 className="text-5xl font-bold mb-12">{data?.title}</h1>
      <div className="flex flex-col items-center text-center gap-4 text-xl py-12 px-0">
        {data?.links?.map((link, index) => (
          <Link
            key={index}
            to={
              params.lang == "en"
                ? "/en" + `${RedirectType(link._type)}/${link.slug?.current}`
                : `${RedirectType(link._type)}/${link.slug?.current}`
            }
            aria-label={`${t(texts.labelText)} ${link.title}`}
          >
            <p className="p-4 hover:underline text-2xl lg:text-4xl">
              {link.title || ""}
            </p>
          </Link>
        ))}
        <p>...</p>
        <Link to={params.lang == "en" ? "/en/artikler" : "/artikler"}>
          <p className="p-4 hover:underline text-2xl lg:text-4xl">
            {t(texts.allArticles)}
          </p>
        </Link>
      </div>
    </div>
  );
}

const texts = {
  allArticles: {
    en: "All articles",
    nb: "Alle artikler",
  },
  labelText: {
    en: "Go to",
    nb: "Gå til",
  },
};
