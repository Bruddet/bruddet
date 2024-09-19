interface ImageProps {
  url: string;
  alt: string;
}

export default function ImageEventPage({ url, alt }: ImageProps) {
  return (
    <div className="flex flex-col  justify-center pt-3  items-center w-full">
      <img src={url} alt={alt} />
    </div>
  );
}
