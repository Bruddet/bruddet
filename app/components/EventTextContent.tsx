import { Custom_EVENT_QUERYResult, QueriedRoleGroup } from "cms/customTypes";
import PortableTextComponent from "./PortableTextComponent";
import { RolesBlock } from "./RolesBlock";
import { Tickets } from "./Tickets";
import { TQuoteStyle } from "~/utils/colorCombinations";

type Props = {
  portableTextStyle: string;
  roleGroups: QueriedRoleGroup[] | null;
  textColor: string;
  data: Custom_EVENT_QUERYResult;
  quoteStyle: TQuoteStyle;
};
export const EventTextContent = ({
  portableTextStyle,
  roleGroups,
  textColor,
  data,
  quoteStyle,
}: Props) => {
  return (
    <div
      className={`flex flex-col mx-24 my-12 ${portableTextStyle} self-center max-w-[2000px]`}
    >
      <PortableTextComponent
        textData={data.text}
        textStyle={portableTextStyle}
        styleBlock={quoteStyle.styleBlock}
        styleLink={quoteStyle.styleLink}
        fillColor={quoteStyle.fillColor}
      />
      <div className="">
        {roleGroups?.map((group: QueriedRoleGroup, i: number) => (
          <RolesBlock roleGroup={group} key={i} />
        ))}
        {data.dates && <Tickets color={textColor} dateTickets={data.dates} />}
      </div>
    </div>
  );
};
