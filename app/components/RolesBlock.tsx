import { QueriedRoleGroup } from "cms/customTypes";
import urlFor from "~/utils/imageUrlBuilder";

type Props = {
  roleGroup: QueriedRoleGroup;
};

export const RolesBlock = ({ roleGroup }: Props) => {
  const { name, persons } = roleGroup;

  return (
    <div>
      <h1 className="text-2xl">{name}</h1>
      {persons && (
        <div className="flex flex-col">
          {persons.map((p) => (
            <div className="flex flex-row my-4">
              {p.person?.image?.asset?._ref && (
                <img
                  className="w-20 mr-4"
                  src={urlFor(p.person?.image.asset?._ref)}
                />
              )}
              <div className="flex flex-col">
                <h3 className="text-xl">{p.person?.name}</h3>
                <p>{p.occupation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
