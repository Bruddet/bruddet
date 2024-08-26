interface QuoteProps {
  fillColor: string;
}

export default function QuoteMarks({ fillColor }: QuoteProps) {
  return (
    <svg
      width="72"
      height="32"
      viewBox="0 0 72 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.4179 2.5L0.700012 8.45534L3.69488 13.6663L4.81795 24.4603L11.313 29.5L31.3 24.4417L25.782 5.47767L19.4179 2.5Z"
        fill={fillColor}
      />
      <path
        d="M41.5182 23.9024L46.494 28.4056L59.7231 32L69.2194 19.2525L71.3 8.15692L56.5372 0L47.4922 1.17107L39.3 10.8832L41.5182 23.9024Z"
        fill={fillColor}
      />
    </svg>
  );
}
