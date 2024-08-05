import { useEffect, useState } from "react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Custom_EVENT_QUERYResult } from "../../sanity/types";
import { getColor } from "../utils/colorCombinations";
import PortableTextComponent from "../components/PortableTextComponent";
import urlFor from "../utils/imageUrlBuilder";
import { Tickets } from "../components/Tickets";
import ImageEventPage from "../components/Masks/ImageEventPage";
import { EventLabels } from "../components/EventLabels";
import RoleDropDown from "../components/RoleDropDown";
import { getEventQuery } from "../queries/event-queries";
import { useBackgroundColor } from "../utils/backgroundColor";
import { FloatingBuyButton } from "../components/FloatingBuyButton";
import { useSlugContext } from "../utils/i18n/SlugProvider";
import { useTranslation } from "../utils/i18n";
import { useBuyButtonObserver } from "../utils/BuyButtonObserver";
import { useQuery } from "../../sanity/loader";
import { loadQuery } from "../../sanity/loader.server";
import { QueryResponseInitial } from "@sanity/react-loader";

export async function loader({ params }: LoaderFunctionArgs) {
  const query = getEventQuery(params);
  const initial = await loadQuery<Custom_EVENT_QUERYResult>(query, params);
  const event = initial.data;

  if (!event) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  if (event == "No translation with this slug") {
    throw new Response("No translation found", {
      status: 404,
    });
  }

  return { initial, query: query, params: params };
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
      en: "Event",
      nb: "Arrangement",
    },
    description: {
      en: "Information about event",
      nb: "Informasjon om arrangement",
    },
  };

  const title = texts.title[language];
  const description = texts.description[language];

  if (!data) {
    return [
      { title: title },
      {
        property: "og:description",
        content: description,
      },
    ];
  }

  return [
    { title: data.initial.data.metaTitle ?? "Forestilling" },
    {
      property: "og:description",
      content: data.initial.data.metaDescription ?? description,
    },
  ];
};

export default function Event() {
  const { initial, query, params } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<Custom_EVENT_QUERYResult>;
    query: string;
    params: Record<string, string>;
  };

  const { data } = useQuery<typeof initial.data>(query, params, {
    initial,
  });

  if (!data) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const [viewScale, setViewScale] = useState(1);
  const { language } = useTranslation();

  const handleScroll = () => {
    const target = document.getElementById("tickets");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const {
    bgColor,
    primaryText,
    secondaryBgColor,
    secondaryBorder,
    textColor,
    textColorBorder,
    portabletextStyle,
    quoteStyle,
  } = getColor(data?.colorCombinationsNight);

  const { setColor } = useBackgroundColor();
  const { setSlug } = useSlugContext();

  useEffect(() => {
    setColor(bgColor);
    setSlug(language, data?._translations);
  }, [bgColor, data?._translations, language, setColor, setSlug]);

  useEffect(() => {
    const updateViewScale = () => {
      if (window.outerWidth > 768) {
        setViewScale(2.4);
      } else if (window.outerWidth < 320) {
        setViewScale(0.6);
      } else if (320 <= window.outerWidth && window.outerWidth < 640) {
        const widthScale = 640 - 320;
        const imageScale = 1.4 - 0.6;
        const width = window.outerWidth;
        const scale = width / (widthScale / imageScale);
        setViewScale(scale);
      } else {
        const widthScale = 1024 - 640;
        const imageScale = 2.25 - 1.2;
        const width = window.outerWidth;
        const scale = width / (widthScale / imageScale);
        setViewScale(scale);
      }
    };
    updateViewScale();
    window.addEventListener("resize", updateViewScale);
  }, []);

  useBuyButtonObserver();

  return (
    <>
      <div
        className={`flex grow flex-col w-full sm:max-w-screen-sm mx-auto relative justify-center justify-self-center ${textColor} items-center p-4 gap-6`}
      >
        {data.image?.asset?._ref && (
          <ImageEventPage
            url={urlFor(data.image.asset._ref, data.image?.hotspot)}
            alt={data?.title || ""}
            scale={viewScale}
            imageMaskType={data?.imageMask || ""}
          />
        )}

        <h1 className={`font-serif text-2xl lg:text-4xl`}>{data.title}</h1>

        {data.dates && (
          <EventLabels
            dateObj={data.dates}
            genre={data.eventGenre}
            primaryText={primaryText}
            secondaryBgColor={secondaryBgColor}
            secondaryBorder={secondaryBorder}
            textColor={textColor}
            textColorBorder={textColorBorder}
          />
        )}
        {data.text && (
          <PortableTextComponent
            textData={data.text}
            textStyle={portabletextStyle}
            styleBlock={quoteStyle.styleBlock}
            styleLink={quoteStyle.styleLink}
            fillColor={quoteStyle.fillColor}
          />
        )}
        {data.dates && <Tickets dateTickets={data.dates} />}

        {data.roleGroups && <RoleDropDown roleGroups={data.roleGroups} />}
      </div>
      <FloatingBuyButton handleScroll={handleScroll} textColor={textColor} />
    </>
  );
}
