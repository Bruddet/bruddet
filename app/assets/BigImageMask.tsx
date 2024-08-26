interface smallImageMaskProps {
  scaleProp: number;
  widthSvg: number;
  heightSvg: number;
}

export default function BigImageMask({
  scaleProp,
  widthSvg,
  heightSvg,
}: smallImageMaskProps) {
  return (
    <svg
      width="0"
      height="0"
      viewBox={`0 0 ${widthSvg} ${heightSvg}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="bigImageMask">
        <path
          d="M63 392.5L1 426V1H388.5V378.5L337 352.5L303 392.5L208 352.5L63 392.5Z"
          fill="#0CFF07"
          stroke="black"
          transform={`scale(${scaleProp})`}
        />
      </clipPath>
    </svg>
  );
}
