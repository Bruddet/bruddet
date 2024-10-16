type Props = {
  color?: string;
}
export default function Dot({color = "#182D39"}: Props) {
  return (
    <svg
      width="11"
      height="12"
      viewBox="0 0 11 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline" }}
    >
      <path
        d="M2.84995 1.67519L0 8.06132L1.21154 11.5019L5.57364 13.5L11 8.34373L8.40257 3.05081L6.00956 0.5L2.84995 1.67519Z"
        fill={color}
      />
    </svg>
  );
}
