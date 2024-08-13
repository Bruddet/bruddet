import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { createTexts, useTranslation } from "../utils/i18n";
import { EVENTS_QUERYResult } from "../../sanity/types";
import Newsletter from "../components/Newsletter";
import { getEventsQuery } from "../queries/event-queries";
import { useBackgroundColor } from "../utils/backgroundColor";
import { QueryResponseInitial } from "@sanity/react-loader";
import { loadQuery } from "../../sanity/loader.server";
import { useQuery } from "../../sanity/loader";

export async function loader({ params }: LoaderFunctionArgs) {
  const { query, params: queryParams } = getEventsQuery(params);
  const initial = await loadQuery<EVENTS_QUERYResult>(query, queryParams);
  const event = initial.data;

  if (!event) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { initial, query: query, queryParams: queryParams };
}

export const meta: MetaFunction<typeof loader> = ({ location }) => {
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
      en: "Events",
      nb: "Forestillinger",
    },
    description: {
      en: "Overview of events",
      nb: "Oversikt over forestillinger",
    },
  };

  const title = texts.title[language];
  const description = texts.description[language];

  return [
    { title: title },
    {
      property: "og:description",
      content: description,
    },
  ];
};

export default function Events() {
  const { initial, query, queryParams } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<EVENTS_QUERYResult>;
    query: string;
    queryParams: Record<string, string>;
  };
  const { data } = useQuery<typeof initial.data>(query, queryParams, {
    initial,
  });

  const { setColor } = useBackgroundColor();
  const { t, language } = useTranslation();
  if (data.length == 0) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  useEffect(() => {
    setColor("bg-strongblue");
  }, [setColor]);
  return (
    <div className="flex flex-col grow items-center text-white font-serif">
      <div className="flex flex-col items-center text-center gap-4 text-xl py-12 px-0">
        {data.map((event, index) => (
          <div key={index}>
            <Link
              key={event._id}
              to={
                event.slug?.current
                  ? `${language === "en" ? "/en/event/" : "/event/"}${
                      event.slug.current
                    }`
                  : ""
              }
              aria-label={`${t(texts.labelText)} ${event.title}`}
            >
              <p className="p-4 hover:underline text-2xl lg:text-4xl">
                {event.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-col items-center text-lg lg:text-xl w-4/5 lg:w-2/3">
        <Newsletter />
      </div>
    </div>
  );
}

const texts = createTexts({
  labelText: {
    nb: "Gå til",
    en: "Go to",
  },
});
