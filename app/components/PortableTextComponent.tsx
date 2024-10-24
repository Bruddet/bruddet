import MuxPlayer from "@mux/mux-player-react";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { Link } from "@remix-run/react";
import { stegaClean } from "@sanity/client/stega";
import urlFor from "../utils/imageUrlBuilder";
import Dice from "./Dice";
import { ExpandableBlockComponent } from "./ExpandableBlockComponent";
import { GoogleMapsComponent } from "./GoogleMapsComponent";
import { QuoteBomb } from "./QuoteBomb";
import { ReviewComponent } from "./ReviewComponent";

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
          />
        );
      },
      block: (props: any) => {
        const { value } = props;
        const { style, _key } = value;

        if (/^h2/.test(style)) {
          const headingId = `${_key}`;
          return (
            <div id={headingId}>
              <Link
                to={`#${headingId}`}
                aria-hidden="true"
                tabIndex={-1}
                className="pointer-events-none cursor-text"
              >
                {PortableText(props)}
              </Link>
            </div>
          );
        }
        return PortableText(props);
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
