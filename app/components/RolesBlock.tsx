import { QueriedRoleGroup } from "cms/customTypes";
import urlFor from "~/utils/imageUrlBuilder";

type Props = {
  roleGroup: QueriedRoleGroup;
};

export const RolesBlock = ({ roleGroup }: Props) => {
  const { name, persons } = roleGroup;

  return (
    <div>
      <h3 className="text-3xl">{name}</h3>
      {persons && (
        <div className="flex flex-col">
          {persons.map((p) => (
            <div className="flex flex-row my-4">
              {p.person?.image?.asset?._ref && (
                <img
                  className="w-20 md:w-32 h-28 md:h-44 object-cover mr-4"
                  src={urlFor(p.person?.image.asset?._ref)}
                />
              )}
              <div className="flex flex-col gap-2">
                <p className="text-2xl md:text-3xl font-bold">
                  {p.person?.name}
                </p>
                <p className="text-xl md:text-2xl">{p.occupation}</p>
                <p className="text-base">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
