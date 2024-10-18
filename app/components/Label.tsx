type Props = {
  key?: number;
  borderColor: string | undefined;
  textColor: string | undefined;
  borderStyle?: string | undefined;
  label: string;
  fontStyle?: string;
  fontWeight?: string;
  isDate?: boolean;
};

export const Label = ({
  key,
  borderColor,
  textColor,
  label,
  fontStyle,
  borderStyle,
  fontWeight,
}: Props) => {
  return (
    <p
      key={key}
      className={`p-2 border h-10 border-box ${fontWeight} text-nowrap w-min ${borderColor} ${textColor} ${fontStyle} ${borderStyle}`}
    >
      {label}
    </p>
  );
};
