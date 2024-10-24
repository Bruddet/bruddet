import { Link } from "@remix-run/react";
import { useState } from "react";
import { stegaClean } from "@sanity/client/stega";

interface Props {
  text: string;
  slug: string | undefined;
}

export default function HexagonBuyButton({ text, slug }: Props) {
  const lines = stegaClean(text.split("_"));
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      to={"/event/" + slug + "#tickets" || "/event"}
    >
      <svg
        width={lines.length === 2 ? "106" : "126"}
        height={lines.length === 2 ? "106" : "126"}
        viewBox="0 0 106 106"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 62.5L34 6L88 0L106 52.5L96.5 90.5L70 105.5L26 103.5L0 62.5Z"
          fill="#D4FF26"
        />
        {lines.map((line, index) => (
          <text
            key={index}
            x="50%"
            y={
              lines.length === 2
                ? `${35 + (index - 0.5) * 20}%`
                : `${25 + (index - 0.5) * 20}%`
            }
            textAnchor="middle"
            dominantBaseline="middle"
            fill="black"
            fontSize={lines.length === 2 ? "18" : "16"}
            fontFamily="PT serif"
            fontWeight="bold"
            className={`${isHovering && "underline"}`}
          >
            <tspan x="50%" dy="1.2em">
              {line}
            </tspan>
          </text>
        ))}
      </svg>
    </Link>
  );
}
