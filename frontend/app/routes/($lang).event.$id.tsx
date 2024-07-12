import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { EVENT_QUERYResult } from "sanity/types";
import { getBackgroundColor } from "~/utils/colorCombinations";
import PortableTextComponent from "~/components/PortableTextComponent";
import urlFor from "~/utils/imageUrlBuilder";
import { Tickets } from "~/components/Tickets";
import { EventLabels } from "~/components/EventLabels";
import { useState } from "react";
import ArrowUp from "/arrow-up.svg";
import ArrowDown from "/arrow-down.svg";
import RoleDropDown from "~/components/RoleDropDown";
import { getEvent } from "~/queries/event-queries";

export async function loader({ params }: LoaderFunctionArgs) {
  const event = await getEvent(params);

  if (!event) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json(event);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (typeof data === "string" || !data) {
    return [
      { title: "Forestilling" },
      {
        property: "og:description",
        content: "Informasjon om forestilling",
      },
    ];
  }

  return [
    { title: data.metaTitle ?? "Forestilling" },
    {
      property: "og:description",
      content: data.metaDescription ?? "Artikkel",
    },
  ];
};

export default function Event() {
  const data = useLoaderData<typeof loader>() as EVENT_QUERYResult;
  const [openRole, setOpenRole] = useState(false);

  if (!data) {
    return <></>;
  }
  return (
    <div className={getBackgroundColor(data.colorCombination)}>
      <h1>Forestilling:</h1>
      {data.image?.asset?._ref ? (
        <img
          src={urlFor(data.image.asset._ref, data.image?.hotspot)}
          alt={data.title}
        />
      ) : (
        <p>No image available</p>
      )}
      {data.dates && <EventLabels dateObj={data.dates} />}
      {data.text && <PortableTextComponent textData={data.text} />}
      {data.dates && <Tickets dateTickets={data.dates} />}
      {data.roleGroups && (
        <button
          className="w-80 h-auto py-4 px-6 m-4 grid grid-flow-col bg-inherit border border-black"
          onClick={() => setOpenRole(!openRole)}
        >
          <span className="self-center justify-self-start text-xl">
            Medvirkende{" "}
          </span>
          <img
            className="w-6 h-6 self-center justify-self-end"
            src={openRole ? ArrowUp : ArrowDown}
            alt={openRole ? "Pil opp" : "Pil ned"}
          />
        </button>
      )}
      {openRole && <RoleDropDown roleGroups={data.roleGroups} />}
    </div>
  );
}