import MuxPlayer from "@mux/mux-player-react";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { CustomContent } from "../../cms/customTypes";
import urlFor from "../utils/imageUrlBuilder";
import { QuoteComponent } from "./QuoteComponent";
import { ReviewComponent } from "./ReviewComponent";
import { ExpandableBlockComponent } from "./ExpandableBlockComponent";
import { stegaClean } from "@sanity/client/stega";
import Dice from "./Dice";

interface QuoteStyle {
  styleBlock?: string;
  styleLink?: string;
  fillColor?: string;
}

export interface PortableTextProps extends QuoteStyle {
  textData: CustomContent;
  textStyle?: string;
  placedLeft: boolean;
}

export default function PortableTextComponent({
  textData,
  textStyle,
  styleBlock,
  styleLink,
  fillColor,
  placedLeft = true,
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
          <div className={placedLeft ? "sm:hidden" : "sm:mb-20"}>
            <img
              src={urlFor(value.asset._ref)}
              alt={value.alt}
              style={{ maxWidth: "100%" }}
              className="mb-1"
            />
            <p className="mt-1">{value.credit}</p>
          </div>
        );
      },
      block: ({
        value,
      }: PortableTextComponentProps<{
        children: { text: string }[];
      }>) => {
        return (
          <div className={!placedLeft && "sm:hidden"}>
            {value.children.map((child, i) => (
              <p key={i}>{child.text}</p>
            ))}
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
          <div className={placedLeft ? "sm:hidden" : "sm:mb-20"}>
            <MuxPlayer
              disableCookies={true}
              playbackId={stegaClean(value.muxVideo.asset?.playbackId)}
              metadata={value.title ? { video_title: value.title } : undefined}
            />
          </div>
        ) : null;
      },
      quote: ({
        value,
      }: PortableTextComponentProps<{
        company: string;
        content: string;
        source: string;
        date: string;
      }>) => {
        return (
          <div className={!placedLeft ? "sm:hidden" : ""}>
            <QuoteComponent
              quote={value}
              styleBlock={styleBlock}
              fillColor={fillColor}
            />
          </div>
        );
      },
      dice: ({
        value,
      }: PortableTextComponentProps<{
        content: string;
        diceValue: number;
      }>) => {
        return (
          <div className={!placedLeft ? "sm:hidden" : ""}>
            <Dice content={value.content} dice={value.diceValue} />
          </div>
        );
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
          <div className={!placedLeft ? "sm:hidden" : ""}>
            <ReviewComponent
              review={value}
              styleBlock={styleBlock}
              styleLink={styleLink}
              fillColor={fillColor}
            />
          </div>
        );
      },
      expandableBlock: ({
        value,
      }: PortableTextComponentProps<{
        title: string;
        content: string;
        textStyle: string;
      }>) => {
        return (
          <div className={!placedLeft ? "sm:hidden" : ""}>
            <ExpandableBlockComponent
              title={value.title}
              textStyle={textStyle}
              content={value.content}
            ></ExpandableBlockComponent>
          </div>
        );
      },
    },
  };

  return (
    <div className={`prose ${textStyle} font-serif text-base`}>
      {textData && (
        <PortableText value={textData} components={customComponents} />
      )}
    </div>
  );
}
