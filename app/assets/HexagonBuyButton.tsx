import { Link } from "@remix-run/react";
import { useState } from "react";

interface Props {
  text: string;
  slug: string | undefined;
}

export default function HexagonBuyButton({ text, slug }: Props) {
  const lines = text.split("\n");
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      to={"/event/" + slug + "#tickets" || "/event"}
    >
      <svg
        width="106"
        height="106"
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
            y={`${35 + (index - 0.5) * 20}%`}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="black"
            fontSize="18"
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
