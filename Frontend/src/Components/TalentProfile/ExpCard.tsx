
import { formatDate } from "../services/Utilities";

const ExpCard = (props: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between mb-2 flex-wrap gap-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-100 dark:bg-mine-shaft-700 rounded-md">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-mine-shaft-900 dark:text-mine-shaft-100">
              {props.title}
            </div>
            <div className="text-sm text-mine-shaft-500 dark:text-mine-shaft-300">
              {props.company} &bull; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-500 dark:text-mine-shaft-300">
          {formatDate(props.startDate)} -{" "}
          {props.working ? "Present" : formatDate(props.endDate)}
        </div>
      </div>
      <div className="text-sm xs-mx:text-xs text-mine-shaft-600 dark:text-mine-shaft-300 text-justify">
        {props.description}
      </div>
    </div>
  );
};

export default ExpCard;