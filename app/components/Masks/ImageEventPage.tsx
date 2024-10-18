interface ImageProps {
  url: string;
  alt: string;
  svgUrl?: string;
  svgAlt?: string;
}

export default function ImageEventPage({
  url,
  alt,
  svgUrl,
  svgAlt,
}: ImageProps) {
  return (
    <div
      id="event-header"
      className="flex justify-center aspect-[9/16] sm:aspect-[16/9] grow bg-cover max-h-[60vh] sm:max-h-[80vh] bg-center w-full  bg-no-repeat max-w-[2000px] mx-auto font-serif"
      style={{
        backgroundImage: `url(${url})`,
      }}
      aria-label={alt}
    >
      <img className="md:w-1/2 max-w-[80%]" src={svgUrl} alt={svgAlt} />
    </div>
  );
}
