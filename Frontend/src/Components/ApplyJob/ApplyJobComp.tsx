


import { timeAgo } from "../services/Utilities";
import ApplicationForm from "./ApplicationForm";

const ApplyJobComp = (props: any) => {
  return (
    <div className="w-2/3 bs-mx:w-4/5 sm-mx:w-full mx-auto">
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-100 dark:bg-mine-shaft-700 rounded-xl">
            <img
              className="h-14 xs-mx:h-10 xs-mx:w-10"
              src={`/Icons/${props.company}.png`}
              alt={props.company}
            />
          </div>
          <div>
            <div className="font-semibold text-2xl xs-mx:text-xl text-mine-shaft-900 dark:text-mine-shaft-100">
              {props.jobTitle}
            </div>
            <div className="text-lg text-mine-shaft-500 dark:text-mine-shaft-300 flex flex-wrap xs-mx:text-base shrink-0">
              <span>{props.company} &bull; </span>
              <span>{timeAgo(props.postTime)} &bull; </span>
              <span>
                {props.applicants ? props.applicants.length : 0} Applicants
              </span>
            </div>
          </div>
        </div>
      </div>
      <ApplicationForm />
    </div>
  );
};

export default ApplyJobComp;