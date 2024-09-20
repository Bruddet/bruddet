import DiceOne from "~/assets/dice/DiceOne";
import DiceTwo from "~/assets/dice/DiceTwo";
import DiceThree from "~/assets/dice/DiceThree";
import DiceFour from "~/assets/dice/DiceFour";
import DiceFive from "~/assets/dice/DiceFive";
import DiceSix from "~/assets/dice/DiceSix";
import StarOne from "~/assets/stars/StarsOne";
import StarTwo from "~/assets/stars/StarsTwo";
import StarThree from "~/assets/stars/StarsThree";
import StarFour from "~/assets/stars/StarsFour";
import StarFive from "~/assets/stars/StarsFive";

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
  styleBlock?: string;
  styleLink?: string;
  fillColor?: string;
}

function getStar(score: number) {
  switch (score) {
    case 1:
      return <StarOne />;
    case 2:
      return <StarTwo />;
    case 3:
      return <StarThree />;
    case 4:
      return <StarFour />;
    case 5:
      return <StarFive />;
    default:
      <></>;
  }
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

export function ReviewComponent({
  review,
  styleBlock,
  styleLink,
}: ReviewProps) {
  return (
    <blockquote className={styleBlock || ""}>
      <span className=" not-italic text-3xl">&quot;{review.content}&quot;</span>
      <span className="not-italic">{review.source}</span>
      {review.link ? (
        <a href={review.link} className={styleLink}>
          {review.company}
        </a>
      ) : (
        <span className={`underline not-italic`}>{review.company}</span>
      )}
      {review.score && review.type ? (
        <span>{getReviewIcon(review.score, review.type)}</span>
      ) : null}
    </blockquote>
  );
}
