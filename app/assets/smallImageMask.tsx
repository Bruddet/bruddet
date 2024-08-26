interface smallImageMaskProps {
  scaleProp: number;
  widthSvg: number;
  heightSvg: number;
}

export default function SmallImageMask({
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
      <clipPath id="smallImageMask">
        <path
          d="M70.6047 0H111.055L182.763 23.4875L215.124 53.6858L200.414 101.406L215.124 137.197L253 156.584L234.246 251.279L165.112 299L81.2689 251.279L6.98692 244.196L0 177.089L27.2122 116.692V38.4002L70.6047 0Z"
          fill="#0CFF07"
          transform={`scale(${scaleProp})`}
        />
      </clipPath>
    </svg>
  );
}
