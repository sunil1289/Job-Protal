

import {
  IconBookmark,
  IconBookmarkFilled,
  IconCalendarMonth,
  IconClockHour3,
} from "@tabler/icons-react";
import { Button, Divider, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { timeAgo } from "../services/Utilities";

const Card = (props: any) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const handleSaveJob = () => {
    let savedJobs: any = [...profile.savedJobs];
    if (savedJobs.includes(props.id)) {
      savedJobs = savedJobs.filter((id: any) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }
    dispatch(changeProfile({ ...profile, savedJobs }));
  };

  return (
    <Link
      to={`/jobs/${props.id}`}
      className="bg-white dark:bg-mine-shaft-800 border border-mine-shaft-200 dark:border-transparent p-4 w-72 rounded-xl shadow-md flex flex-col gap-3 hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-500 transition-colors duration-300"
    >
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
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-sm text-mine-shaft-900 dark:text-mine-shaft-100">
              {props.jobTitle}
            </div>
            <div className="text-xs text-mine-shaft-500 dark:text-mine-shaft-300">
              {props.company} &#x2022;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>

        {profile.savedJobs?.includes(props.id) ? (
          <IconBookmarkFilled
            className="text-bright-sun-400 cursor-pointer"
            stroke={1.5}
            onClick={(e) => { e.preventDefault(); handleSaveJob(); }}
          />
        ) : (
          <IconBookmark
            className="text-mine-shaft-400 dark:text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer transition-colors duration-200"
            stroke={1.5}
            onClick={(e) => { e.preventDefault(); handleSaveJob(); }}
          />
        )}
      </div>

      {/* Tags */}
      <div
        className="flex gap-2 mb-2 text-xs
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

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="font-semibold text-mine-shaft-800 dark:text-mine-shaft-200 text-sm">
          ₹{props.packageOffered} LPA
        </div>
        <div className="flex gap-1 text-xs text-mine-shaft-500 dark:text-mine-shaft-400 items-center">
          <IconClockHour3 className="h-4 w-4" stroke={1.5} />
          {props.applied || props.interviewing
            ? "Applied"
            : props.offered
              ? "Interviewed"
              : "Posted"}{" "}
          {timeAgo(props.postTime)}
        </div>
      </div>

      {(props.offered || props.interviewing) && (
        <Divider size="xs" color="mineShaft.2" className="dark:!border-mine-shaft-700" />
      )}

     
      {props.offered && (
        <div className="flex gap-2">
          <Button color="brightSun.4" variant="light" fullWidth>
            Accept
          </Button>
          <Button color="brightSun.4" variant="light" fullWidth>
            Reject
          </Button>
        </div>
      )}

  
      {props.interviewing && (
        <div className="flex gap-1 text-xs items-center">
          <IconCalendarMonth stroke={1.5} className="text-bright-sun-400 w-5 h-5" />
          Sun, 22 March &bull;
          <span className="text-mine-shaft-500 dark:text-mine-shaft-400"> 3:00 PM</span>
        </div>
      )}
    </Link>
  );
};

export default Card;