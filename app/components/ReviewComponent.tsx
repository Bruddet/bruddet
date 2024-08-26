import QuoteMarks from "../assets/QuoteMarks";

interface ReviewProps {
  review: {
    score?: number;
    content?: string;
    source?: string;
    company?: string;
    date?: string;
    link?: string;
  };
  styleBlock?: string;
  styleLink?: string;
  fillColor?: string;
}

export function ReviewComponent({
  review,
  styleBlock,
  styleLink,
  fillColor,
}: ReviewProps) {
  return (
    <blockquote className={styleBlock || ""}>
      <QuoteMarks fillColor={fillColor || "#00000"} />
      <span className="font-bold text-4xl">{review.content}</span>
      <span className="not-italic">{review.source}</span>
      {review.link ? (
        <a href={review.link} className={styleLink}>
          {review.company}
        </a>
      ) : (
        <span className={`underline not-italic`}>{review.company}</span>
      )}
    </blockquote>
  );
}
