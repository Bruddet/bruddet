import { RoleGroup } from "sanity.types";
import { Person } from "~/sanity.types";
import urlFor from "~/utils/imageUrlBuilder";

type Props = {
  roleGroup: RoleGroup;
};
export const RolesBlock = ({ roleGroup }: Props) => {
  const { name, persons } = roleGroup;
  return (
    <div>
      <h1>{name}</h1>
      {persons && (
        <div>
          {persons.map((p: Person) => (
            <div></div>
          ))}
        </div>
      )}
    </div>
  );
};
