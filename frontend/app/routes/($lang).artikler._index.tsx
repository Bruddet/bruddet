import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { ARTICLES_QUERYResult } from "../../sanity/types";
import { getArticlesQuery } from "../queries/article-queries";
import { useBackgroundColor } from "../utils/backgroundColor";
import { useEffect } from "react";
import { loadQuery } from "../../sanity/loader.server";
import { QueryResponseInitial, useQuery } from "@sanity/react-loader";
import { createTexts, useTranslation } from "../utils/i18n";

export async function loader({ params }: LoaderFunctionArgs) {
  const { query, params: queryParams } = getArticlesQuery(params);
  const initial = await loadQuery<ARTICLES_QUERYResult>(query, queryParams);
  const articles = initial.data;

  if (!articles) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { initial, query: query, queryParams: queryParams };
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  if (!data) {
    return [
      { title: "Artikler" },
      {
        property: "og:description",
        content: "Page not found",
      },
    ];
  }
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
      en: "Articles",
      nb: "Artikler",
    },
    description: {
      en: "Overview of articles",
      nb: "Oversikt over artikler",
    },
  };

  const title = texts.title[language];
  const description = texts.description[language];
  const sanityData = data.initial.data;

  return [
    { title: sanityData.metaTitle ?? title },
    {
      property: "og:description",
      content: sanityData.metaDescription ?? description,
    },
  ];
};

export default function Articles() {
  const { initial, query, queryParams } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<ARTICLES_QUERYResult>;
    query: string;
    queryParams: Record<string, string>;
  };

  const { data } = useQuery<typeof initial.data>(query, queryParams, {
    initial,
  });
  const params = useParams();
  const { t } = useTranslation();
  const { setColor } = useBackgroundColor();

  if (data.length == 0) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  useEffect(() => {
    setColor("bg-white");
  }, [setColor]);
  return (
    <div className="grow">
      <div className="text-center py-12 px-0">
        {data.map((article, index) => (
          <div key={index}>
            <Link
              key={article._id}
              to={
                params.lang == "en"
                  ? "/en/artikler/" + article.slug.current
                  : article.slug.current
              }
              aria-label={`${t(texts.labelText)} ${article.title}`}
            >
              <h2 className="p-4 hover:underline font-serif text-2xl lg:text-4xl">
                {article.title}
              </h2>
            </Link>
          </div>
        ))}
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
