import MuxPlayer from "@mux/mux-player-react";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import urlFor from "../utils/imageUrlBuilder";
import { ReviewComponent } from "./ReviewComponent";
import { ExpandableBlockComponent } from "./ExpandableBlockComponent";
import { stegaClean } from "@sanity/client/stega";
import Dice from "./Dice";
import { QuoteBomb } from "./QuoteBomb";
import { GoogleMapsComponent } from "./GoogleMapsComponent";

export interface PortableTextProps {
  data?: any;
  textColor?: string;
}

export default function PortableTextComponent({
  textColor,
  data,
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
          <div className="md:py-10">
            <img src={urlFor(value.asset._ref)} alt={value.alt} />
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
      googleMaps: ({
        value,
      }: PortableTextComponentProps<{
        address: { lat: string; lng: string; _key: string };
      }>) => {
        return (
          <GoogleMapsComponent
            lat={value.address.lat}
            lng={value.address.lng}
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
        return <ReviewComponent review={value} />;
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
            textColor={textColor}
            content={value.content}
          ></ExpandableBlockComponent>
        );
      },
      quoteBomb: ({
        value,
      }: PortableTextComponentProps<{
        quote: string;
        creditsSource?: string;
        creditsMedia?: string;
      }>) => {
        return (
          <QuoteBomb
            quote={value.quote}
            creditsMedia={value.creditsMedia}
            creditsSource={value.creditsSource}
          />
        );
      },
    },
  };

  return <PortableText value={data} components={customComponents} />;
}
