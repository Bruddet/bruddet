import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction, useLoaderData, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { INFOPAGE_QUERYResult } from "../../sanity/types";
import { getInfoPageQuery } from "../queries/info-queries";
import { useBackgroundColor } from "../utils/backgroundColor";
import { useTranslation } from "../utils/i18n";
import { loadQuery } from "../../sanity/loader.server";
import { QueryResponseInitial } from "@sanity/react-loader";
import { useQuery } from "../../sanity/loader";

export async function loader({ params }: LoaderFunctionArgs) {
  const query = getInfoPageQuery(params);
  const initial = await loadQuery<INFOPAGE_QUERYResult>(query, params);
  const informationPage = initial.data;

  if (!informationPage) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { initial, query: query, sanityParams: params };
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
      { title: "Info" },
      {
        property: "og:description",
        content: description,
      },
    ];
  }

  return [
    { title: sanityData.metaTitle ?? "Info" },
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
  const { initial, query, sanityParams } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<INFOPAGE_QUERYResult>;
    query: string;
    sanityParams: Record<string, string>;
  };
  const { data } = useQuery<typeof initial.data>(query, sanityParams, {
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
