import { Custom_EVENT_QUERYResult } from "cms/customTypes";
import PortableTextComponent from "./PortableTextComponent";
import { RolesAndTickets } from "./RolesAndTickets";
import { swapActiveImage } from "~/utils/GallerySlider";

type Props = {
  textColor: string;
  data: Custom_EVENT_QUERYResult;
};

export const activeGallerySlideClassName = `absolute mt-5 opacity-1 transition-opacity duration-400 ease-linear delay-400 gallery-slide`;
export const inactiveGallerySlideClassName = `mt-5 opacity-0 gallery-slide`;

export const EventTextContent = ({ textColor, data }: Props) => {
  const leftBlockTypes = ["block", "review"];

  const rightBlockTypes = [
    "quoteBomb",
    "expandableBlock",
    "dice",
    "video",
    "customImage",
  ];

  const galleryDisplayType = data.galleryDisplayType;

  window.onscroll = () => {
    swapActiveImage();
  };

  const rightBlocks = data?.text.filter((block) =>
    rightBlockTypes.includes(block._type)
  );
  const leftBlocks = data?.text.filter((block) =>
    leftBlockTypes.includes(block._type)
  );

  const galleryClassName =
    galleryDisplayType === 1
      ? "lg:w-4/5 flex flex-col items-center sticky top-0 h-screen-vh"
      : "lg:w-4/5 flex flex-col items-center";

  return (
    <div
      className={`flex flex-col mt-12 ${textColor} self-center max-w-[2000px]`}
    >
      {/*grid-block for regular screens*/}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-10 font-serif text-xl">
          <div className="flex justify-start w-full">
            <div className="lg:w-4/5 flex flex-col gap-8">
              {leftBlocks.map((d, index) => (
                <PortableTextComponent
                  textColor={textColor}
                  key={index}
                  data={d}
                />
              ))}
              <RolesAndTickets roleGroups={data?.roleGroups} data={data} />
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div className={galleryClassName}>
              {rightBlocks?.map((d, index) => (
                <div
                  className={
                    galleryDisplayType != 1
                      ? "mt-5"
                      : index === 0
                      ? activeGallerySlideClassName
                      : inactiveGallerySlideClassName
                  }
                >
                  <PortableTextComponent
                    textColor={textColor}
                    key={index}
                    data={d}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*column for mobile screens*/}
      <div className="flex md:hidden flex-col gap-4">
        {data?.text?.map((d, index) => (
          <>
            <PortableTextComponent key={index} data={d} textColor={textColor} />
          </>
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
