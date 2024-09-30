import { Custom_EVENT_QUERYResult } from "cms/customTypes";
import PortableTextComponent from "./PortableTextComponent";
import { RolesAndTickets } from "./RolesAndTickets";

type Props = {
  textColor: string;
  data: Custom_EVENT_QUERYResult;
};

export const EventTextContent = ({ textColor, data }: Props) => {
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
      className={`flex flex-col my-12 ${textColor} self-center max-w-[2000px]`}
    >
      {/*grid-block for regular screens*/}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-10 font-serif text-xl">
          <div className="flex justify-start w-full">
            <div className="w-4/5 flex flex-col gap-8">
              {data?.text?.map(
                (d, index) =>
                  leftBlocks.includes(d._type) && (
                    <PortableTextComponent
                      textColor={textColor}
                      key={index}
                      data={d}
                    />
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
                      textColor={textColor}
                      key={index}
                      data={d}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      {/*column for mobile screens*/}
      <div className="flex md:hidden flex-col gap-4">
        {data?.text?.map((d, index) => (
          <div className="">
            <PortableTextComponent key={index} data={d} textColor={textColor} />
          </div>
        ))}
        <RolesAndTickets
          roleGroups={data?.roleGroups}
          textColor={textColor}
          data={data}
        />
      </div>
    </div>
  );
};
