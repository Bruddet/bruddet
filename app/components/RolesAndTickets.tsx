import { Custom_EVENT_QUERYResult, QueriedRoleGroup } from "cms/customTypes";
import { RolesBlock } from "./RolesBlock";
import { Tickets } from "./Tickets";

type Props = {
  roleGroups: QueriedRoleGroup[] | undefined | null;
  textColor?: string;
  data: Custom_EVENT_QUERYResult | undefined;
};

export const RolesAndTickets = ({ roleGroups, data, textColor }: Props) => {
  return (
    <div className="flex flex-col gap-16 my-8">
      {roleGroups?.map((group: QueriedRoleGroup, i: number) => (
        <RolesBlock roleGroup={group} key={i} />
      ))}
      {data?.dates && (
        <Tickets textColor={textColor} dateTickets={data.dates} />
      )}
    </div>
  );
};
