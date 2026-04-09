import { Button } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

const CompanyCard = (props: any) => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center p-2  bg-mine-shaft-900">
          <div className="flex gap-2 items-center capitalize">
            <div className="p-2 bg-mine-shaft-800 rounded-md">
              <img
                className="h-7"
                src={`/Icons/${props.name}.png`}
                alt="microsoft"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">{props.name}</div>
              <div className="text-xs text-mine-shaft-300">
                {props.company} &middot; {props.employees} Employees
              </div>
            </div>
          </div>
          <Button
            color="brightSun.4"
            variant="subtle"
            classNames={{ label: "capitalize" }}
            rightSection={<IconExternalLink />}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default CompanyCard;
