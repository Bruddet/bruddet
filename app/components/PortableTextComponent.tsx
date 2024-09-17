import MuxPlayer from "@mux/mux-player-react";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { CustomContent } from "../../sanity/types";
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

interface PortableTextProps extends QuoteStyle {
  textData: CustomContent;
  textStyle?: string;
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
          <>
            <img
              src={urlFor(value.asset._ref)}
              alt={value.alt}
              style={{ maxWidth: "100%" }}
              className="mb-1"
            />
            <p className="mt-1">{value.credit}</p>
          </>
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
      quote: ({
        value,
      }: PortableTextComponentProps<{
        company: string;
        content: string;
        source: string;
        date: string;
      }>) => {
        return (
          <QuoteComponent
            quote={value}
            styleBlock={styleBlock}
            fillColor={fillColor}
          />
        );
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
      }: PortableTextComponentProps<{ title: string; content: string }>) => {
        return (
          <ExpandableBlockComponent title={value.title}>
            {value.content}
          </ExpandableBlockComponent>
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
