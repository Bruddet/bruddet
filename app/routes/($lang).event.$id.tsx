import { useEffect, useState } from "react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Custom_EVENT_QUERYResult,
  QueriedRoleGroup,
} from "../../cms/customTypes";
import { getColor } from "../utils/colorCombinations";
import PortableTextComponent from "../components/PortableTextComponent";
import urlFor from "../utils/imageUrlBuilder";
import { Tickets } from "../components/Tickets";
import ImageEventPage from "../components/Masks/ImageEventPage";
import { getEventQuery } from "../queries/event-queries";
import { useBackgroundColor } from "../utils/backgroundColor";
import { FloatingBuyButton } from "../components/FloatingBuyButton";
import { useSlugContext } from "../utils/i18n/SlugProvider";
import { useTranslation } from "../utils/i18n";
import { useBuyButtonObserver } from "../utils/BuyButtonObserver";
import { QueryResponseInitial } from "@sanity/react-loader";
import { loadQuery } from "../../cms/loader.server";
import { useQuery } from "../../cms/loader";
import { loadQueryOptions } from "../../cms/loadQueryOptions.server";
import { RolesBlock } from "~/components/RolesBlock";
import { EventLabels } from "~/components/EventLabels";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { options } = await loadQueryOptions(request.headers);
  const { query, params: queryParams } = getEventQuery(params);
  const initial = await loadQuery<Custom_EVENT_QUERYResult>(
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

  return { initial, query: query, queryParams: queryParams };
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
  const { initial, query, queryParams } = useLoaderData<typeof loader>() as {
    initial: QueryResponseInitial<Custom_EVENT_QUERYResult>;
    query: string;
    queryParams: Record<string, string>;
  };

  const { data } = useQuery<typeof initial.data>(query, queryParams, {
    initial,
  });

  if (!data) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const [viewScale, setViewScale] = useState(1);
  const { language } = useTranslation();

  const {
    image,
    roleGroups,
    text,
    dates,
    colorCombination,
    _translations,
    labels,
    eventGenre,
    duration,
  } = data;
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
  } = getColor(colorCombination || "creamBlue");

  const { setColor } = useBackgroundColor();
  const { setSlug } = useSlugContext();

  useEffect(() => {
    setColor(bgColor);
    if (_translations && _translations != undefined) {
      setSlug(language, _translations);
    }
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
        className={`flex-col flex w-full sm:max-w-screen-sm mx-auto  ${textColor} p-4 gap-6 font-serif `}
      >
        {image?.asset?._ref && (
          <ImageEventPage
            url={urlFor(image.asset._ref, data.image?.hotspot)}
            alt={data?.title || ""}
            scale={viewScale}
            imageMaskType={data?.imageMask || ""}
          />
        )}

        <h1 className={`text-2xl lg:text-4xl`}>{data.title}</h1>

        {dates && (
          <EventLabels
            dates={dates}
            customLabels={labels}
            genre={eventGenre}
            duration={duration}
            primaryText={primaryText}
            secondaryBgColor={secondaryBgColor}
            secondaryBorder={secondaryBorder}
            textColor={textColor}
            textColorBorder={textColorBorder}
          />
        )}
        {text && (
          <PortableTextComponent
            textData={text}
            textStyle={portabletextStyle}
            styleBlock={quoteStyle.styleBlock}
            styleLink={quoteStyle.styleLink}
            fillColor={quoteStyle.fillColor}
          />
        )}
        {roleGroups?.map((group: QueriedRoleGroup, i: number) => (
          <RolesBlock key={i} roleGroup={group} />
        ))}
        {data.dates && <Tickets color={textColor} dateTickets={data.dates} />}
      </div>
      {/*<FloatingBuyButton handleScroll={handleScroll} textColor={textColor} />*/}
    </>
  );
}
