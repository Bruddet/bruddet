type Props = {
  key?: number;
  textColorBorder: string | undefined;
  textColor: string | undefined;
  label: string;
  textStyle?: string;
  isDate?: boolean;
};

export const Label = ({
  key,
  textColorBorder,
  textColor,
  label,
  textStyle,
  isDate,
}: Props) => {
  return (
    <div
      key={key}
      className={`p-2 border ${textColorBorder} ${textColor} ${textStyle}`}
    >
      {label}
    </div>
  );
};
