import MuxPlayer from "@mux/mux-player-react";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { CustomContent } from "../../cms/customTypes";
import urlFor from "../utils/imageUrlBuilder";
import { ReviewComponent } from "./ReviewComponent";
import { ExpandableBlockComponent } from "./ExpandableBlockComponent";
import { stegaClean } from "@sanity/client/stega";
import Dice from "./Dice";
import { QuoteBomb } from "./QuoteBomb";

export interface PortableTextProps {
  textData?: CustomContent;
  textStyle?: string;
  styleBlock?: string;
  styleLink?: string;
  fillColor?: string;
}

export default function PortableTextComponent({
  textData,
  textStyle,
  styleBlock,
  styleLink,
  fillColor,
}: PortableTextProps) {
  const customComponents = {
    types: {
      customImage: ({
        value,
      }: PortableTextComponentProps<{
        asset: { _ref: string; _type: "reference" };
        alt: string;
        credit: string;
      }>) => {
        return (
          <div>
            <img
              src={urlFor(value.asset._ref)}
              alt={value.alt}
              style={{ width: "30em" }}
              className="mb-1"
            />
            <p className="mt-1">{value.credit}</p>
          </div>
        );
      },
      video: ({
        value,
      }: PortableTextComponentProps<{
        muxVideo: { asset: { playbackId: string } };
        title: string;
      }>) => {
        return value.muxVideo?.asset ? (
          <MuxPlayer
            disableCookies={true}
            playbackId={stegaClean(value.muxVideo.asset?.playbackId)}
            metadata={value.title ? { video_title: value.title } : undefined}
          />
        ) : null;
      },
      dice: ({
        value,
      }: PortableTextComponentProps<{
        content: string;
        diceValue: number;
      }>) => {
        return <Dice content={value.content} dice={value.diceValue} />;
      },
      review: ({
        value,
      }: PortableTextComponentProps<{
        score?: number;
        content?: string;
        source?: string;
        date?: string;
        link?: string;
      }>) => {
        return (
          <ReviewComponent
            review={value}
            styleBlock={styleBlock}
            styleLink={styleLink}
            fillColor={fillColor}
          />
        );
      },
      expandableBlock: ({
        value,
      }: PortableTextComponentProps<{
        title: string;
        content: PortableTextProps;
        textStyle: string;
      }>) => {
        return (
          <ExpandableBlockComponent
            title={value.title}
            textStyle={textStyle}
            content={value.content}
          ></ExpandableBlockComponent>
        );
      },
      quoteBomb: ({
        value,
      }: PortableTextComponentProps<{
        quote: string;
      }>) => {
        return <QuoteBomb quote={value.quote} />;
      },
    },
  };

  const rightBlocks = ["block"];

  const leftBlocks = [
    "review",
    "quoteBomb",
    "expandableBlock",
    "dice",
    "video",
    "customImage",
  ];

  return (
    <div className="grid grid-cols-2 gap-10 font-serif text-xl">
      <div className="w-4/5">
        {textData?.map(
          (data, index) =>
            rightBlocks.includes(data._type) && (
              <PortableText
                key={index}
                value={data}
                components={customComponents}
              />
            )
        )}
      </div>
      <div className={`${textStyle} w-4/5 justify-self-end`}>
        {textData?.map(
          (data, index) =>
            leftBlocks.includes(data._type) && (
              <div className="my-14">
                <PortableText
                  key={index}
                  value={data}
                  components={customComponents}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
