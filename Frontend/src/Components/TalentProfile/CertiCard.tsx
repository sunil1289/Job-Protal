

import { formatDate } from "../services/Utilities";

const CertiCard = (props: any) => {
  return (
    <div className="flex justify-between mb-2 sm-mx:flex-wrap gap-2">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-100 dark:bg-mine-shaft-700 rounded-md shrink-0">
          <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold xs-mx:text-sm text-mine-shaft-900 dark:text-mine-shaft-100">
            {props.name}
          </div>
          <div className="text-sm xs-mx:text-xs text-mine-shaft-500 dark:text-mine-shaft-300">
            {props.issuer}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="text-sm flex sm-mx:flex-row sm-mx:gap-2 text-mine-shaft-500 dark:text-mine-shaft-300">
          {formatDate(props.issueDate)}
        </div>
        <div className="text-sm xs-mx:text-xs text-mine-shaft-500 dark:text-mine-shaft-300">
          ID: {props.certificateId}
        </div>
      </div>
    </div>
  );
};

export default CertiCard;