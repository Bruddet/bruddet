import DiceOne from "~/assets/dice/DiceOne";
import DiceTwo from "~/assets/dice/DiceTwo";
import DiceThree from "~/assets/dice/DiceThree";
import DiceFour from "~/assets/dice/DiceFour";
import DiceFive from "~/assets/dice/DiceFive";
import DiceSix from "~/assets/dice/DiceSix";
import StarsOne from "~/assets/stars/StarsOne";

interface ReviewProps {
  review: {
    score?: number;
    content?: string;
    source?: string;
    company?: string;
    date?: string;
    link?: string;
    type?: string;
  };
}

function getStar(score: number) {
  return (
    <div className="flex">
      {Array.from({ length: score }).map((_, i) => (
        <StarsOne />
      ))}
    </div>
  );
}

function getDice(score: number) {
  switch (score) {
    case 1:
      return <DiceOne />;
    case 2:
      return <DiceTwo />;
    case 3:
      return <DiceThree />;
    case 4:
      return <DiceFour />;
    case 5:
      return <DiceFive />;
    case 6:
      return <DiceSix />;
    default:
      <></>;
  }
}

function getReviewIcon(score: number, type: string) {
  if (type === "stars") {
    return getStar(score);
  } else if (type === "dice") {
    return getDice(score);
  }
}

export function ReviewComponent({ review }: ReviewProps) {
  return (
    <blockquote className="flex flex-col text-center justify-center items-center gap-4">
      <p className="not-italic text-3xl ">&quot;{review.content}&quot;</p>
      {review.source && (
        <p className="not-italic text-basic">
          {review.source?.toLocaleUpperCase()}
        </p>
      )}
      {review.link ? (
        <a href={review.link} className={"underline cursor-pointer"}>
          {review.company}
        </a>
      ) : (
        <p>{review.company}</p>
      )}
      {review.score && review.type && review.type != "standard" ? (
        <div className="">{getReviewIcon(review.score, review.type)}</div>
      ) : null}
    </blockquote>
  );
}
