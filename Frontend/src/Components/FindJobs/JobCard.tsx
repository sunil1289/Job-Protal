

import {
  IconBookmark,
  IconBookmarkFilled,
  IconClockHour3,
} from "@tabler/icons-react";
import { Button, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { timeAgo } from "../services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";

const JobCard = (props: any) => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const handleSaveJob = (e?: any) => {
    if (e) e.preventDefault();
    let savedJobs = [...(profile.savedJobs || [])];
    if (savedJobs.includes(props.id)) {
      savedJobs = savedJobs.filter((id: any) => id !== props.id);
    } else {
      savedJobs.push(props.id);
    }
    dispatch(changeProfile({ ...profile, savedJobs }));
  };

  return (
    <div className="bg-white dark:bg-mine-shaft-800 border border-mine-shaft-200 dark:border-transparent p-4 w-72 rounded-xl shadow-md flex flex-col sm-mx:w-full gap-3 hover:shadow-[0_0_8px_2px_rgba(255,215,0,0.3)] transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between mb-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-100 dark:bg-mine-shaft-700 rounded-md">
            <img
              className="h-7"
              src={`/Icons/${props.company}.png`}
              alt={props.company}
            />
          </div>
          <div>
            <div className="font-semibold text-sm text-mine-shaft-900 dark:text-mine-shaft-100">
              {props.jobTitle}
            </div>
            <div className="text-xs text-mine-shaft-500 dark:text-mine-shaft-300">
              {props.company} • {props.applicants?.length || 0} Applicants
            </div>
          </div>
        </div>
        {profile.savedJobs?.includes(props.id) ? (
          <IconBookmarkFilled
            className="text-bright-sun-400 cursor-pointer"
            stroke={1.5}
            onClick={handleSaveJob}
          />
        ) : (
          <IconBookmark
            className="text-mine-shaft-400 dark:text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer"
            stroke={1.5}
            onClick={handleSaveJob}
          />
        )}
      </div>

      {/* Tags */}
      <div
        className="flex gap-2 flex-wrap mb-2 text-xs capitalize
          [&>div]:py-1 [&>div]:px-2
          [&>div]:bg-mine-shaft-100 dark:[&>div]:bg-mine-shaft-700
          [&>div]:text-bright-sun-500 dark:[&>div]:text-bright-sun-400
          [&>div]:rounded-lg"
      >
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>

      {/* Description */}
      <Text
        className="text-xs text-justify !text-mine-shaft-600 dark:!text-mine-shaft-300"
        lineClamp={3}
      >
        {props.about}
      </Text>

      <Divider size="xs" color="mineShaft.2" className="dark:!border-mine-shaft-700" />

      <div className="flex justify-between items-center">
        <div className="font-semibold text-mine-shaft-800 dark:text-mine-shaft-200 text-sm">
          ₹ {props.packageOffered} LPA
        </div>
        <div className="flex gap-1 text-xs text-mine-shaft-500 dark:text-mine-shaft-400 items-center">
          <IconClockHour3 className="h-4 w-4" stroke={1.5} />
          {timeAgo(props.postTime)}
        </div>
      </div>

      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brightSun.4" variant="outline">
          View Job
        </Button>
      </Link>
    </div>
  );
};

export default JobCard;