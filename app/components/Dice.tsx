import DiceOne from "../assets/dice/DiceOne";
import DiceTwo from "../assets/dice/DiceTwo";
import DiceThree from "../assets/dice/DiceThree";
import DiceFour from "../assets/dice/DiceFour";
import DiceFive from "../assets/dice/DiceFive";
import DiceSix from "../assets/dice/DiceSix";

type Props = {
  dice: number;
  content: string;
};

function getDice(dice: number) {
  switch (dice) {
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

export default function Dice({ dice, content }: Props) {
  return (
    <div>
      <p>{content}</p>
      {getDice(dice)}
    </div>
  );
}
