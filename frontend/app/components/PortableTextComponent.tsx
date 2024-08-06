import MuxPlayer from "@mux/mux-player-react";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { CustomContent } from "../../sanity/types";
import urlFor from "../utils/imageUrlBuilder";
import { QuoteComponent } from "./QuoteComponent";
import { ReviewComponent } from "./ReviewComponent";
import { ExpandableBlockComponent } from "./ExpandableBlockComponent";

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
      }>) => {
        return (
          <img
            src={urlFor(value.asset._ref)}
            alt={value.alt}
            style={{ maxWidth: "100%" }}
          />
        );
      },
      video: ({
        value,
      }: PortableTextComponentProps<{
        muxVideo: { asset: { playbackId: string } };
        title: string;
      }>) => {
        return value.muxVideo.asset ? (
          <MuxPlayer
            disableCookies={true}
            playbackId={value.muxVideo.asset.playbackId}
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
      }: PortableTextComponentProps<{ question: string; answer: string }>) => {
        return <ExpandableBlockComponent value={value} />;
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
