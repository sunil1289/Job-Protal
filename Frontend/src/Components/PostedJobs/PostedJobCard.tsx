

import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../services/Utilities";

const PostedJobCard = (props: any) => {
  const { id } = useParams();
  return (
    <Link
      to={`/posted-jobs/${props.id}`}
      className={`rounded-xl p-2 w-52 border-l-2 lg-mx:w-48 bs-mx:w-44 hover:bg-opacity-80 cursor-pointer border-l-bright-sun-400 transition-colors duration-200
        ${props.id == id
          ? "bg-bright-sun-400 text-black"
          : "bg-mine-shaft-100 dark:bg-mine-shaft-800 text-mine-shaft-800 dark:text-mine-shaft-300"
        }`}
    >
      <div className="text-sm font-semibold">{props.jobTitle}</div>
      <div className="text-xs font-medium">{props.location}</div>
      <div className="text-xs">
        {props.jobStatus == "DRAFT"
          ? "Drafted"
          : props.jobStatus == "CLOSED"
          ? "Closed"
          : "Posted"}{" "}
        {timeAgo(props.postTime)}
      </div>
    </Link>
  );
};

export default PostedJobCard;