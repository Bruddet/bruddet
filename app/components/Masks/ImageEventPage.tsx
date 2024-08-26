import SmallImageMask from "../../assets/smallImageMask";
import BigImageMask from "../../assets/BigImageMask";
import { getImageMask } from "../../utils/imageMask";

interface MaskProps {
  url: string;
  alt: string;
  scale: number;
  imageMaskType: string;
}

export default function ImageEventPage({
  url,
  alt,
  scale = 1,
  imageMaskType,
}: MaskProps) {
  const maskType = getImageMask(imageMaskType);

  if (maskType === "smallImageMask") {
    return (
      <>
        <div className="flex flex-col  justify-center pt-3  items-center w-full">
          <SmallImageMask
            scaleProp={scale || 1}
            widthSvg={253}
            heightSvg={299}
          />
          <img
            src={url}
            alt={alt}
            style={{
              clipPath: "url(#smallImageMask)",
              objectFit: "cover",
              width: `${253 * scale}px`,
              height: `${299 * scale}px`,
            }}
          />
        </div>
      </>
    );
  } else if (maskType === "bigImageMask") {
    return (
      <>
        <div className="flex flex-col  justify-center pt-0  items-center w-full">
          <BigImageMask scaleProp={scale || 1} widthSvg={389} heightSvg={427} />
          <img
            src={url}
            alt={alt}
            style={{
              clipPath: "url(#bigImageMask)",
              objectFit: "cover",
              width: `${389 * scale}px`,
              height: `${427 * scale}px`,
            }}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col  justify-center pt-3  items-center w-full">
          <img src={url} alt={alt} />
        </div>
      </>
    );
  }
}
