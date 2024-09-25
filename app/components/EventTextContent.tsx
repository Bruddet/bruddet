import { Custom_EVENT_QUERYResult } from "cms/customTypes";
import PortableTextComponent from "./PortableTextComponent";
import { TQuoteStyle } from "~/utils/colorCombinations";
import { RolesAndTickets } from "./RolesAndTickets";

type Props = {
  portableTextStyle: string;
  textColor: string;
  data: Custom_EVENT_QUERYResult;
  quoteStyle: TQuoteStyle;
};

export const EventTextContent = ({
  portableTextStyle,
  data,
  quoteStyle,
}: Props) => {
  const leftBlocks = ["block", "review"];

  const rightBlocks = [
    "quoteBomb",
    "expandableBlock",
    "dice",
    "video",
    "customImage",
  ];
  return (
    <div
      className={`flex flex-col mx-24 my-12 ${portableTextStyle} self-center max-w-[2000px]`}
    >
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-10 font-serif text-xl">
          <div className="flex justify-start w-full">
            <div className="w-4/5">
              {data?.text?.map(
                (d, index) =>
                  leftBlocks.includes(d._type) && (
                    <PortableTextComponent key={index} data={d} />
                  )
              )}
              <RolesAndTickets roleGroups={data?.roleGroups} data={data} />
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div className="w-4/5 flex flex-col items-center">
              {data?.text?.map(
                (d, index) =>
                  rightBlocks.includes(d._type) && (
                    <PortableTextComponent
                      quoteStyle={quoteStyle}
                      key={index}
                      data={d}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        {data?.text?.map((d, index) => (
          <>
            <PortableTextComponent
              quoteStyle={quoteStyle}
              key={index}
              data={d}
            />
          </>
        ))}
        <RolesAndTickets
          roleGroups={data?.roleGroups}
          textColor={""}
          data={data}
        />
      </div>
    </div>
  );
};
