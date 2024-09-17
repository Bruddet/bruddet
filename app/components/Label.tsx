type Props = {
  key?: number;
  borderColor: string | undefined;
  textColor: string | undefined;
  borderStyle?: string | undefined;
  label: string;
  fontStyle?: string;
  isDate?: boolean;
};

export const Label = ({
  key,
  borderColor,
  textColor,
  label,
  fontStyle,
  borderStyle,
}: Props) => {
  return (
    <div
      key={key}
      className={`p-2 border text-nowrap w-min ${borderColor} ${textColor} ${fontStyle} ${borderStyle}`}
    >
      {label}
    </div>
  );
};
