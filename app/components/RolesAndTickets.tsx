import {
  Custom_ARTICLE_QUERYResult,
  Custom_EVENT_QUERYResult,
  QueriedRoleGroup,
} from "cms/customTypes";
import { RolesBlock } from "./RolesBlock";
import { Tickets } from "./Tickets";

type Props = {
  roleGroups: QueriedRoleGroup[] | undefined | null;
  textColor?: string;
  data: Custom_EVENT_QUERYResult | Custom_ARTICLE_QUERYResult | undefined;
};

export const RolesAndTickets = ({ roleGroups, data, textColor }: Props) => {
  function isCustomEventQueryResult(
    data: any
  ): data is Custom_EVENT_QUERYResult {
    return data && "dates" in data && "ticketInformation" in data;
  }

  return (
    <div className="flex flex-col gap-16 my-8">
      {roleGroups?.map((group: QueriedRoleGroup, i: number) => (
        <RolesBlock roleGroup={group} key={i} />
      ))}
      {isCustomEventQueryResult(data) && (
        <Tickets
          textColor={textColor}
          dateTickets={data.dates}
          ticketInformation={data.ticketInformation}
        />
      )}
    </div>
  );
};
