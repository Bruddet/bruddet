interface TriangleProps {
  direction: "left" | "right";
  color?: string;
}

export default function Triangle({
  direction,
  color = "#9AED15",
}: TriangleProps) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={direction === "right" ? { transform: "rotate(180deg)" } : {}}
    >
      <path
        d="M19.9917 24.3948L23.0937 24.9775L23.2164 0.83958L17.6177 3.34547L9.76118 5.67509L0.231948 11.9863L9.20057 18.6304L17.0129 22.157L19.9917 24.3948Z"
        fill={color}
      />
    </svg>
  );
}
