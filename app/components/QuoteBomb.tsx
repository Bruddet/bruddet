type Props = {
  quote: string;
};
export const QuoteBomb = ({ quote }: Props) => {
  const lengthOfString = quote.length;

  const getFontSize = () => {
    if (lengthOfString < 20) {
      return "120px";
    } else if (lengthOfString > 20 && lengthOfString < 40) {
      return "90px";
    } else if (lengthOfString > 40 && lengthOfString < 60) {
      return "70px";
    } else {
      return "60px";
    }
  };
  const fontSize = getFontSize();
  return (
    <div>
      <svg
        width="474"
        height="360"
        viewBox="0 0 474 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="imageMask"
          d="M54 78.0296L105 16.8473L185 0L358 24.8276L402 106.404L474 208.374L422 283.744L392 343.153L190 360L68 343.153L61 287.291L9 222.562L0 180.887L68 116.158L54 78.0296Z"
          fill="#D4FF26"
        />

        <foreignObject x="80" y="30" width="290" height="300">
          <div
            style={{
              fontSize: fontSize,
              color: "black",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <p style={{ margin: "0", padding: "0", lineHeight: "70px" }}>
              {quote}
            </p>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};
